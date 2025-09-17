import { Module } from '@nestjs/common';
import { UserCredentialRepositorySymbol } from '@auth/application/port/out/user-credential-repository.port';
import { UserCredentialRepositoryImpl } from '@auth/infrastructure/persistence/user-credential.repository';
import { TokenRepositoryImpl } from '@auth/infrastructure/persistence/token.repository';
import { DatabaseModule } from '@libs/database';
import { TokenRepositorySymbol } from '@auth/application/port/out/token-repository.port';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { JwtAuthWithRefreshTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-refresh-token.guard';
import { JwtTokenModule } from '@libs/jwt';

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

    JwtAuthWithAccessTokenGuard,
    JwtAuthWithRefreshTokenGuard,
  ],
  exports: [
    UserCredentialRepositorySymbol,
    TokenRepositorySymbol,
    JwtAuthWithAccessTokenGuard,
    JwtAuthWithRefreshTokenGuard,
  ],
})
export class AuthInfrastructureModule {}
