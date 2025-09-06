import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';
import { CreateUserCommand } from '@user/application/port/in/create-user.command';
import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Lock } from '@libs/decorators';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly userCredentialService: UserCredentialService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Lock({
    key: args => `create-user:${args[0].email}`,
    ttl: 10000,
    timeout: 5000,
  })
  @Transactional()
  async execute(command: CreateUserCommand): Promise<User> {
    try {
      const user = await this.userService.createUser(
        new CreateUserParam(
          command.email,
          command.nickname,
          command.password,
          command.birthday,
        ),
      );
      await this.userCredentialService.createCredential({
        email: user.email,
        passwordHash: user.hashedPassword,
        userId: user.id,
      });
      return user;
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
