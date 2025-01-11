import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '@user/application/commands/handlers/create-user.handler';
import { UpdateUserHandler } from '@user/application/commands/handlers/update-user.handler';
import { DeleteUserHandler } from '@user/application/commands/handlers/delete-user.handler';
import { UserService } from '@user/application/services/user.service';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';
import { JwtTokenModule } from '@libs/jwt';

@Module({
  imports: [CqrsModule, UserInfrastructureModule, JwtTokenModule],
  providers: [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserService,
  ],
  exports: [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserService,
  ],
})
export class UserApplicationModule {}
