import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, Observable, of, switchMap, tap } from 'rxjs';

import {
  CACHE_METADATA_KEY,
  CacheOptions,
} from '@libs/decorators/cache/cache.decorator';
import { RedisService } from '@libs/redis';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private static readonly DEFAULT_TTL = 300;
  private static readonly CACHE_PREFIX = 'cache:';

  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const options = this.reflector.get<CacheOptions>(
      CACHE_METADATA_KEY,
      context.getHandler(),
    );

    if (!options) {
      return next.handle();
    }
    const cacheKey = this.generateCacheKey(options, context);
    const ttl = options.ttl || CacheInterceptor.DEFAULT_TTL;

    return from(this.getCachedValue(cacheKey)).pipe(
      switchMap(cachedValue => {
        if (cachedValue !== null) {
          return of(cachedValue);
        }

        return next.handle().pipe(
          tap(result => {
            if (this.shouldCache(result, options)) {
              this.saveCachedValue(cacheKey, result, ttl);
            }
          }),
        );
      }),
    );
  }

  private async getCachedValue(key: string): Promise<any> {
    try {
      const client = this.redisService.getClient();
      const prefix = CacheInterceptor.CACHE_PREFIX;
      const cached = await client.get(`${prefix}${key}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }
  private async saveCachedValue(
    key: string,
    value: any,
    ttl: number,
  ): Promise<void> {
    try {
      const client = this.redisService.getClient();
      const prefix = CacheInterceptor.CACHE_PREFIX;
      const setKey = `${prefix}${key}`;
      await client.setex(setKey, ttl, JSON.stringify(value));
    } catch {}
  }

  private shouldCache(result: any, options: CacheOptions): boolean {
    if (result == null || result === undefined) {
      return options.cacheNull ?? false;
    }

    if (result instanceof Error) {
      return false;
    }

    if (options.condition) {
      return options.condition(result);
    }

    return true;
  }

  private generateCacheKey(
    options: CacheOptions,
    context: ExecutionContext,
  ): string {
    const args = context.getArgs();
    const actualArgs = args.length === 4 ? args[1] : args[0];

    if (typeof options.key === 'function') {
      return options.key(actualArgs);
    }

    if (typeof options.key === 'string') {
      return options.key;
    }
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const argsHash = this.createSimpleHash(actualArgs || {});
    return `${className}:${methodName}:${argsHash}`;
  }

  private createSimpleHash(value: any): string {
    try {
      const str = JSON.stringify(value);
      return str.length > 50 ? str.substring(0, 50) : str;
    } catch {
      return 'complex';
    }
  }
}
