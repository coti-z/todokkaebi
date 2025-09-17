import { RedisService } from '@libs/redis';

export interface CacheEvictOptions {
  /**
   * 무효화할 캐시 키 생성 함수
   * - args: 메서드 인자
   * - result: 메서드 실행 결과 (timing이 'after'일 때만 사용 가능)
   */
  keys: (args: any[], result?: any) => string[];

  /**
   * 실행 시점
   * - 'before': 메서드 실행 전 무효화
   * - 'after': 메서드 실행 후 무효화 (기본값)
   */
  timing?: 'before' | 'after';

  /**
   * 조건부 무효화
   * - true를 반환할 때만 캐시 무효화 실행
   * - timing이 'after'일 때만 result 사용 가능
   */
  condition?: (args: any[], result?: any) => boolean;

  /**
   * 에러 발생 시 무효화 여부
   * - true: 메서드 실행이 실패해도 캐시 무효화
   * - false: 메서드 실행 성공 시에만 캐시 무효화 (기본값)
   */
  evictOnError?: boolean;

  /**
   * 비동기 무효화
   * - true: 캐시 무효화를 비동기로 처리 (응답 속도 향상)
   * - false: 동기적으로 처리 (기본값)
   */
  async?: boolean;
}

interface WithRedisService {
  redisService?: RedisService;
}

export function CacheEvict(options: CacheEvictOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: WithRedisService, ...args: any[]) {
      if (!this.redisService) {
        return originalMethod.apply(this, args);
      }

      const { redisService } = this;
      const timing = options.timing || 'after';

      // Before 실행
      if (timing === 'before') {
        const shouldEvict = options.condition
          ? options.condition(args, undefined)
          : true;

        if (shouldEvict) {
          await evictCache(redisService, options, args, undefined);
        }
      }

      let result: any;
      let error: any;

      try {
        // 원본 메서드 실행
        result = await originalMethod.apply(this, args);

        // After 실행 (기본값)
        if (timing === 'after') {
          const shouldEvict = options.condition
            ? options.condition(args, result)
            : true;

          if (shouldEvict) {
            if (options.async) {
              // 비동기 무효화 - 에러 무시
              evictCache(redisService, options, args, result).catch(err => {
                console.error('[CacheEvict] Async eviction failed:', err);
              });
            } else {
              // 동기 무효화
              await evictCache(redisService, options, args, result);
            }
          }
        }

        return result;
      } catch (err) {
        error = err;

        // 에러 발생 시 무효화
        if (options.evictOnError) {
          try {
            await evictCache(redisService, options, args, undefined);
          } catch (evictError) {
            console.error('[CacheEvict] Eviction on error failed:', evictError);
          }
        }

        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 실제 캐시 무효화 수행
 */
async function evictCache(
  redisService: RedisService,
  options: CacheEvictOptions,
  args: any[],
  result?: any,
): Promise<void> {
  try {
    const client = redisService.getClient();
    const userKeys = options.keys(args, result);

    if (userKeys.length === 0) {
      return;
    }

    // cache: 프리픽스 추가 (Cache 데코레이터와 일관성)
    const cacheKeys = userKeys.map(key => `cache:${key}`);

    // 캐시 삭제
    await client.del(...cacheKeys);

    console.log(`[CacheEvict] Deleted ${cacheKeys.length} keys`);
  } catch (error) {
    console.error('[CacheEvict] Failed to evict cache:', error);
    // 캐시 무효화 실패가 비즈니스 로직에 영향을 주지 않도록 함
  }
}
