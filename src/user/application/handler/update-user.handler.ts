import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Lock } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';

import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import { UpdateUserCommand } from '@user/application/port/in/update-user.command';
import {
  AUTH_CLIENT_OUTBOUND_PORT,
  IAuthClientPort,
} from '@user/application/port/out/i-auth-client.port';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(AUTH_CLIENT_OUTBOUND_PORT)
    private readonly authClient: IAuthClientPort,
    private readonly userService: UserService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Lock({
    key: args => `update-user:${args[0].id}`,
    ttl: 10000,
    timeout: 10000,
  })
  @Transactional()
  async execute(command: UpdateUserCommand): Promise<User> {
    try {
      const user = await this.userService.updateUser(
        new UpdateUserParam(
          command.id,
          command.email,
          command.nickname,
          command.birthday,
        ),
      );

      await this.authClient.updateUserCredential({
        context: command.context,
        userId: command.id,
        email: command.email,
        passwordHash: command.password,
      });

      return user;
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}

핝
