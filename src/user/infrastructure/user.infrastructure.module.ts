import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '@libs/database';

import { AuthApplicationModule } from '@auth/application/auth.application.module';

import { AUTH_CLIENT_OUTBOUND_PORT } from '@user/application/port/out/i-auth-client.port';
import { UserRepositorySymbol } from '@user/application/port/out/i-user-repository.port';
import { PASSWORD_HASHER_OUTBOUND_PORT } from '@user/domain/port/out/i-password-hasher.port';
import { AuthClientAdapter } from '@user/infrastructure/adapter/cqrs/auth.client';
import { BcryptPasswordHasherAdapter } from '@user/infrastructure/adapter/password-hasher.adapter';
import { UserRepositoryImpl } from '@user/infrastructure/persistence/database/user.repository';

@Module({
  imports: [DatabaseModule, AuthApplicationModule, CqrsModule],
  providers: [
    {
      provide: PASSWORD_HASHER_OUTBOUND_PORT,
      useClass: BcryptPasswordHasherAdapter,
    },
    {
      provide: AUTH_CLIENT_OUTBOUND_PORT,
      useClass: AuthClientAdapter,
    },
    {
      provide: UserRepositorySymbol,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [
    AUTH_CLIENT_OUTBOUND_PORT,
    PASSWORD_HASHER_OUTBOUND_PORT,
    UserRepositorySymbol,
  ],
})
export class UserInfrastructureModule {}
