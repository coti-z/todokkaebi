import { LockInterceptor } from '@libs/decorators/lock.interceptor';
import { RedisModule } from '@libs/redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [RedisModule],
  providers: [LockInterceptor],
  exports: [LockInterceptor],
})
export class DecoratorsModule {}
