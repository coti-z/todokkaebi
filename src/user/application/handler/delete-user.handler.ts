import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { DeleteUserCommand } from '@user/application/port/in/delete-user.command';
import { UserService } from '@user/application/services/user.service';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userService: UserService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: DeleteUserCommand): Promise<void> {
    try {
      await this.userService.deleteUser(new DeleteUserParam(command.id));
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
