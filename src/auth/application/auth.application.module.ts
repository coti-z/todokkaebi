import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { BasicLoginHandler } from '@auth/application/handler/commands/basic-login.handler';
import { ReissueTokenHandler } from '@auth/application/handler/commands/reissue-token.handler';
import { BasicLogoutHandler } from '@auth/application/handler/commands/basic-logout.handler';
import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { TokenService } from '@auth/application/service/token.service';
import { ValidateAccessTokenHandler } from '@auth/application/handler/query/validate-access-token.handler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
import { ValidateRefreshTokenHandler } from '@auth/application/handler/query/validate-refresh-token.handler';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [
    CqrsModule,
    AuthInfrastructureModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),

      inject: [ConfigService],
    }),
    ConfigModule,
    RedisModule,
  ],
  providers: [
    ErrorHandlingStrategy,
    BasicLoginHandler,
    BasicLogoutHandler,
    ReissueTokenHandler,
    ValidateAccessTokenHandler,
    ValidateRefreshTokenHandler,
    UserCredentialService,
    TokenService,
    TokenByJWTService,
    {
      provide: TransactionManagerSymbol,
      useClass: PrismaTransactionManager,
    },
  ],
  exports: [
    BasicLoginHandler,
    BasicLogoutHandler,
    ReissueTokenHandler,
    ValidateAccessTokenHandler,
    ValidateRefreshTokenHandler,
    UserCredentialService,
  ],
})
export class AuthApplicationModule {}
