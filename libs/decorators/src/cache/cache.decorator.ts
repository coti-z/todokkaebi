import { RedisService } from '@libs/redis';

export const CACHE_METADATA_KEY = 'cache';
export interface CacheOptions {
  /**
   * 캐시 키 생성 방식
   * - function: 동적 키 생성 함수
   */
  key: (args: any[]) => string;

  /** TTL (초) - 기본값: 300초 (5분) */
  ttl?: number;

  /** null/undefined 캐싱 여부 - 기본값: false */
  cacheNull?: boolean;

  /** 조건부 캐싱 함수  */
  condition?: (result: any) => boolean;
}

interface WithRedisService {
  redisService?: RedisService;
}

export function Cache(options: CacheOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    // const className = target.constructor.name;

    descriptor.value = async function (this: WithRedisService, ...args: any[]) {
      if (!this.redisService) {
        return originalMethod.apply(this, args);
      }
      const { redisService } = this;

      const userKey = options.key(args);
      const cacheKey = `cache:${userKey}`;
      const ttl = options.ttl || 300;
      try {
        // 1. 캐시 확인
        const client = redisService.getClient();
        const cached = await client.get(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);

          return parsed;
        }
        // 캐시 미스 - 원본 매서드 실행
        const result = await originalMethod.apply(this, args);

        if (!shouldCacheResult(result, options)) {
          return result;
        }

        // Redis에 원본 메서스 실행값 저장
        await client.setex(cacheKey, ttl, JSON.stringify(result));
        return result;
      } catch {
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

function shouldCacheResult(result: any, options: CacheOptions): boolean {
  if (result == null || result === undefined) {
    return options.cacheNull || false;
  }

  if (options.condition) {
    return options.condition(result);
  }

  return true;
}
