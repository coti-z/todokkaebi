import { RedisService } from '@libs/redis';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LOCK_METADATA_KEY, LockOptions } from './lock.decorator';

@Injectable()
export class LockInterceptor implements NestInterceptor {
  private static readonly DEFAULT_TTL = 30000;
  private static readonly DEFAULT_TIMEOUT = 30000;

  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const lockOptions = this.reflector.get<LockOptions>(
      LOCK_METADATA_KEY,
      context.getHandler(),
    );
    if (!lockOptions) {
      return next.handle();
    }

    const lockKey = this.generateLockKey(lockOptions, context);
    const ttl = lockOptions.ttl || LockInterceptor.DEFAULT_TTL;
    const timeout = lockOptions.timeout || LockInterceptor.DEFAULT_TIMEOUT;
    const throwOnTimeout = lockOptions.throwOnTimeout ?? true;

    return from(this.acquireLockWithQueue(lockKey, ttl, timeout)).pipe(
      switchMap(lockResult => {
        if (!lockResult.acquired) {
          if (throwOnTimeout) {
            return throwError(
              () => new RequestTimeoutException(`Lock timeout: ${lockKey}`),
            );
          }
          return from(Promise.resolve(null));
        }

        return next.handle().pipe(
          switchMap(async result => {
            await lockResult.release?.();
            return result;
          }),
        );
      }),
    );
  }

  private async acquireLockWithQueue(
    lockKey: string,
    ttl: number,
    timeoutMs: number,
  ) {
    const queueKey = `lock_queue:${lockKey}`;
    const actualLockKey = `lock:${lockKey}`;
    const identifier = Math.random().toString(36).substring(2, 15);
    const client = this.redisService.getClient();

    try {
      // 큐에 진입하고 순서 대기
      await client.lpush(queueKey, identifier);
      const timeoutSeconds = Math.ceil(timeoutMs / 1000);
      const result = await client.brpop(queueKey, timeoutSeconds);

      if (!result || result[1] !== identifier) {
        await this.cleanupQueue(queueKey, identifier);
        return { acquired: false };
      }

      // 실제 락 획득 - NX 플래그로 이미 존재하는 락 보호
      const acquired = await client.set(
        actualLockKey,
        identifier,
        'PX',
        ttl,
        'NX',
      );
      if (acquired === 'OK') {
        return {
          acquired: true,
          release: async () => {
            const script = `
              if redis.call("GET", KEYS[1]) == ARGV[1] then
                return redis.call("DEL", KEYS[1])
              else
                return 0
              end
            `;
            const released = await client.eval(
              script,
              1,
              actualLockKey,
              identifier,
            );
            return released === 1;
          },
        };
      }

      return { acquired: false };
    } catch (error) {
      await this.cleanupQueue(queueKey, identifier);
      throw error;
    }
  }

  private async cleanupQueue(
    queueKey: string,
    identifier: string,
  ): Promise<void> {
    try {
      const client = this.redisService.getClient();
      await client.lrem(queueKey, 1, identifier);
    } catch (error) {
      console.warn(`Queue cleanup failed: ${queueKey}:${identifier}`);
    }
  }

  private generateLockKey(
    options: LockOptions,
    context: ExecutionContext,
  ): string {
    const args = context.getArgs();

    if (typeof options.key === 'function') {
      return options.key(args);
    }

    if (typeof options.key === 'string') {
      return options.key;
    }

    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const argsHash = JSON.stringify(args)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 50);

    return `${className}.${methodName}:${argsHash}`;
  }
}
