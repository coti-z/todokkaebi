import { Module } from '@nestjs/common';

import { CacheInterceptor } from '@libs/decorators/cache/cache.interceptor';
import { LockInterceptor } from '@libs/decorators/lock/lock.interceptor';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [RedisModule],
  providers: [LockInterceptor, CacheInterceptor],
  exports: [LockInterceptor, CacheInterceptor],
})
export class DecoratorsModule {}
