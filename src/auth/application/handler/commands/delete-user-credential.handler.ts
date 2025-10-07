import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';
import { UserCredentialService } from '@auth/application/service/user-credential.service';

@Injectable()
@CommandHandler(DeleteUserCredentialCommand)
export class DeleteUserCredentialHandler
  implements ICommandHandler<DeleteUserCredentialCommand>
{
  constructor(
    private readonly userCredentialService: UserCredentialService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: DeleteUserCredentialCommand): Promise<void> {
    try {
      await this.userCredentialService.deleteCredential({
        userId: command.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
