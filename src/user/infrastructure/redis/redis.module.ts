import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
export const REDIS_EVENT_SYMBOL = 'EVENT_BUS';
@Module({
  imports: [
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
            retryStrategy: (times: number): number => {
              const delay = Math.min(times * 50, 2000);
              return delay;
            },
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RedisModule {}
