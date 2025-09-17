import { Module } from '@nestjs/common';
import { BasicAuthResolver } from '@auth/presentation/resolver/basic-auth.resolver';
import { TokenResolver } from '@auth/presentation/resolver/token.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtTokenModule } from '@libs/jwt';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [CqrsModule, JwtTokenModule, RedisModule],
  providers: [TokenResolver, BasicAuthResolver],
  controllers: [],
  exports: [TokenResolver, BasicAuthResolver],
})
export class AuthPresentationModule {}
