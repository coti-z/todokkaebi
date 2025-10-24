import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { DecoratorsModule } from '@libs/decorators/decorators.module';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisModule } from '@libs/redis';

import { CreateUserHandler } from '@user/application/handler/create-user.handler';
import { DeleteUserHandler } from '@user/application/handler/delete-user.handler';
import { UpdateUserHandler } from '@user/application/handler/update-user.handler';
import { UserService } from '@user/application/services/user.service';
import { UserDomainModule } from '@user/domain/user.domain.module';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    RedisModule,
    DecoratorsModule,
    UserDomainModule,
    UserInfrastructureModule,
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
  ],
  exports: [CreateUserHandler, UpdateUserHandler, DeleteUserHandler],
})
export class UserApplicationModule {}
