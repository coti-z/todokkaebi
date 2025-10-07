import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  RATE_LIMIT_METADATA_KEY,
  RateLimitOptions,
} from '@libs/decorators/rate-limit/rate-limit.options';
import { RedisService } from '@libs/redis';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private static readonly DEFAULT_LIMIT = 5;
  private static readonly DEFAULT_WINDOW = 60; // seconds

  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<RateLimitOptions>(
      RATE_LIMIT_METADATA_KEY,
      context.getHandler(),
    );

    if (!options) {
      return true; // No rate limit configured
    }

    const key = this.generateKey(options, context);
    const limit = options.limit || RateLimitGuard.DEFAULT_LIMIT;
    const window = options.window || RateLimitGuard.DEFAULT_WINDOW;
    const blockDuration = options.blockDuration || window;

    const result = await this.checkRateLimit(key, limit, window, blockDuration);

    if (!result.allowed) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message:
            options.errorMessage ||
            `Rate limit exceeded. Try again in ${result.retryAfter} seconds`,
          retryAfter: result.retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  private async checkRateLimit(
    key: string,
    limit: number,
    window: number,
    blockDuration: number,
  ) {
    const client = this.redisService.getClient();
    const rateLimitKey = `rate_limit:${key}`;
    const blockKey = `rate_limit:block:${key}`;

    // Check if blocked
    const blocked = await client.get(blockKey);
    if (blocked) {
      const ttl = await client.ttl(blockKey);
      return {
        allowed: false,
        retryAfter: ttl > 0 ? ttl : blockDuration,
      };
    }

    const current = await client.incr(rateLimitKey);

    if (current === 1) {
      await client.expire(rateLimitKey, window);
    }

    if (current > limit) {
      // Block the user for blockDuration
      await client.setex(blockKey, blockDuration, '1');
      return {
        allowed: false,
        retryAfter: blockDuration,
      };
    }

    return { allowed: true, retryAfter: 0 };
  }

  private generateKey(
    options: RateLimitOptions,
    context: ExecutionContext,
  ): string {
    const args = context.getArgs();

    // Custom key function
    if (typeof options.key === 'function') {
      return options.key(args);
    }

    // Fixed key
    if (typeof options.key === 'string') {
      return options.key;
    }

    // Default: extract identifier from command/query
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const command = args[0];

    // Try to extract identifier (userId, email, etc.)
    const identifier = command?.userId || command?.email || 'unknown';

    return `${className}.${methodName}:${identifier}`;
  }
}
