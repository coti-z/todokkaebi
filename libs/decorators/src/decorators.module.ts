import { Module } from '@nestjs/common';

import { LockInterceptor } from '@libs/decorators/lock/lock.interceptor';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [RedisModule],
  providers: [LockInterceptor],
  exports: [LockInterceptor],
})
export class DecoratorsModule {}
