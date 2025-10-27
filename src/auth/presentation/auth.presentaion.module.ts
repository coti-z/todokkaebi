import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { JwtTokenModule } from '@libs/jwt';
import { RedisModule } from '@libs/redis';

import { AuthEventListenerController } from '@auth/presentation/controller/auth-event-listener.controller';
import { BasicAuthResolver } from '@auth/presentation/resolver/basic-auth.resolver';
import { TokenResolver } from '@auth/presentation/resolver/token.resolver';

import { REDIS_EVENT_SYMBOL } from '@user/infrastructure/redis/redis.module';

@Module({
  imports: [
    CqrsModule,
    JwtTokenModule,
    RedisModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: REDIS_EVENT_SYMBOL,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientProvider => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST', 'redis'),
            port: configService.get<number>('REDIS_PORT', 6379),
          },
        }),
      },
    ]),
  ],
  providers: [TokenResolver, BasicAuthResolver, AuthEventListenerController],
  controllers: [AuthEventListenerController],
  exports: [TokenResolver, BasicAuthResolver],
})
export class AuthPresentationModule {}
