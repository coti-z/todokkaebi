import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { AuthModule } from '@auth/auth.module';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { DecoratorsModule } from '@libs/decorators/decorators.module';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisModule } from '@libs/redis';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '@user/application/handler/create-user.handler';
import { DeleteUserHandler } from '@user/application/handler/delete-user.handler';
import { UpdateUserHandler } from '@user/application/handler/update-user.handler';

import { UserService } from '@user/application/services/user.service';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    UserInfrastructureModule,
    AuthInfrastructureModule,
    DatabaseModule,
    AuthModule,
    RedisModule,
    DecoratorsModule,
  ],
  providers: [
    {
      provide: TransactionManagerSymbol,
      useClass: PrismaTransactionManager,
    },
    ErrorHandlingStrategy,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,

    UserService,
    UserCredentialService,
  ],
  exports: [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserService,
  ],
})
export class UserApplicationModule {}
