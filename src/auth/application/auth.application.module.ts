import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisModule } from '@libs/redis';

import { BasicLoginHandler } from '@auth/application/handler/commands/basic-login.handler';
import { BasicLogoutHandler } from '@auth/application/handler/commands/basic-logout.handler';
import { DeleteUserCredentialHandler } from '@auth/application/handler/commands/delete-user-credential.handler';
import { ReissueTokenHandler } from '@auth/application/handler/commands/reissue-token.handler';
import { StoreUserCredentialHandler } from '@auth/application/handler/commands/store-user-credential.handler';
import { UpdateUserCredentialHandler } from '@auth/application/handler/commands/update-user-credential.handler';
import { ValidateAccessTokenHandler } from '@auth/application/handler/query/validate-access-token.handler';
import { ValidateRefreshTokenHandler } from '@auth/application/handler/query/validate-refresh-token.handler';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
import { TokenService } from '@auth/application/service/token.service';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';

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
    StoreUserCredentialHandler,
    UpdateUserCredentialHandler,
    DeleteUserCredentialHandler,
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
    StoreUserCredentialHandler,
    UpdateUserCredentialHandler,
    DeleteUserCredentialHandler,

    UserCredentialService,
  ],
})
export class AuthApplicationModule {}
