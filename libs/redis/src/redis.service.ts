import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.client = new Redis(
      this.configService.get('REDIS_PORT', 6379),
      this.configService.get('REDIS_HOST', 'localhost'),
      {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        connectTimeout: 10000,
        commandTimeout: 5000,
      },
    );
  }
  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
  async acquireLock(
    key: string,
    ttlMs: number = 30000,
    identifier: string = Math.random().toString(36),
  ): Promise<{
    acquired: boolean;
    identifier?: string;
    release?: () => Promise<boolean>;
  }> {
    const lockKey = `lock:${key}`;

    const result = await this.client.set(
      lockKey,
      identifier,
      'PX',
      ttlMs,
      'NX',
    );

    if (result === 'OK') {
      return {
        acquired: true,
        identifier,
        release: async () => {
          const script = `
            if redis.call("GET", KEYS[1]) == ARGV[1] then
              return redis.call("DEL", KEYS[1])
            else
              return 0
            end
          `;
          const released = await this.client.eval(
            script,
            1,
            lockKey,
            identifier,
          );
          return released === 1;
        },
      };
    }

    return { acquired: false };
  }

  async releaseLock(key: string, identifier: string): Promise<boolean> {
    const lockKey = `lock:${key}`;
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, lockKey, identifier);
    return result === 1;
  }

  getClient(): Redis {
    return this.client;
  }
}
