import { CacheInterceptor } from '@libs/decorators/cache/cache.interceptor';
import { LockInterceptor } from '@libs/decorators/lock/lock.interceptor';
import { RedisModule } from '@libs/redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [RedisModule],
  providers: [LockInterceptor, CacheInterceptor],
  exports: [LockInterceptor, CacheInterceptor],
})
export class DecoratorsModule {}
