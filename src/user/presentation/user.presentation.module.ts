import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { JwtTokenModule } from '@libs/jwt';
import { RedisModule } from '@libs/redis';

import { AuthModule } from '@auth/auth.module';

import { UserResolver } from '@user/presentation/resolver/user.resolver';

@Module({
  imports: [CqrsModule, JwtTokenModule, AuthModule, RedisModule],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserPresentationModule {}
