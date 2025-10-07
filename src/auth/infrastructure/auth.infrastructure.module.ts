import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '@libs/database';
import { JwtTokenModule } from '@libs/jwt';

import { PASSWORD_HASHER_OUTBOUND_PORT } from '@auth/application/port/out/password-hasher.port';
import { TokenRepositorySymbol } from '@auth/application/port/out/token-repository.port';
import { UserCredentialRepositorySymbol } from '@auth/application/port/out/user-credential-repository.port';
import { BcryptPasswordHasherAdapter } from '@auth/infrastructure/adapter/password-hasher.adapter';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { JwtAuthWithRefreshTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-refresh-token.guard';
import { TokenRepositoryImpl } from '@auth/infrastructure/persistence/token.repository';
import { UserCredentialRepositoryImpl } from '@auth/infrastructure/persistence/user-credential.repository';

@Module({
  imports: [DatabaseModule, CqrsModule, JwtTokenModule],
  providers: [
    {
      provide: UserCredentialRepositorySymbol,
      useClass: UserCredentialRepositoryImpl,
    },
    {
      provide: TokenRepositorySymbol,
      useClass: TokenRepositoryImpl,
    },
    {
      provide: PASSWORD_HASHER_OUTBOUND_PORT,
      useClass: BcryptPasswordHasherAdapter,
    },

    JwtAuthWithAccessTokenGuard,
    JwtAuthWithRefreshTokenGuard,
  ],
  exports: [
    UserCredentialRepositorySymbol,
    TokenRepositorySymbol,
    PASSWORD_HASHER_OUTBOUND_PORT,
    JwtAuthWithAccessTokenGuard,
    JwtAuthWithRefreshTokenGuard,
  ],
})
export class AuthInfrastructureModule {}
