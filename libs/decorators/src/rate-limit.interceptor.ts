import { RedisService } from '@libs/redis';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RATE_LIMIT_METADATA_KEY, RateLimitOptions } from './rate-limit.decorator';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private static readonly DEFAULT_LIMIT = 5;
  private static readonly DEFAULT_WINDOW = 60; // seconds

  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.get<RateLimitOptions>(
      RATE_LIMIT_METADATA_KEY,
      context.getHandler(),
    );
    
    if (!options) {
      return next.handle();
    }

    const key = this.generateKey(options, context);
    const limit = options.limit || RateLimitInterceptor.DEFAULT_LIMIT;
    const window = options.window || RateLimitInterceptor.DEFAULT_WINDOW;

    return from(this.checkRateLimit(key, limit, window)).pipe(
      switchMap(result => {
        if (!result.allowed) {
          throw new HttpException(
            {
              statusCode: HttpStatus.TOO_MANY_REQUESTS,
              message: options.errorMessage || 
                `Rate limit exceeded. Try again in ${result.retryAfter} seconds`,
              retryAfter: result.retryAfter,
            },
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        return next.handle();
      }),
    );
  }

  private async checkRateLimit(
    key: string,
    limit: number,
    window: number,
  ) {
    const client = this.redisService.getClient();
    const rateLimitKey = `rate_limit:${key}`;
    
    const current = await client.incr(rateLimitKey);
    
    if (current === 1) {
      await client.expire(rateLimitKey, window);
    }
    
    if (current > limit) {
      const ttl = await client.ttl(rateLimitKey);
      return {
        allowed: false,
        retryAfter: ttl > 0 ? ttl : window,
      };
    }

    return { allowed: true, retryAfter: 0 };
  }

  private generateKey(
    options: RateLimitOptions,
    context: ExecutionContext,
  ): string {
    const args = context.getArgs();
    
    if (typeof options.key === 'function') {
      return options.key(args);
    }
    
    if (typeof options.key === 'string') {
      return options.key;
    }
    
    // Default: use class.method:userId or email
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const command = args[0];
    
    // Try to extract identifier
    const identifier = command?.userId || command?.email || 'unknown';
    
    return `${className}.${methodName}:${identifier}`;
  }
}