import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';
import { UserCredentialService } from '@auth/application/service/user-credential.service';

@Injectable()
@CommandHandler(UpdateUserCredentialCommand)
export class UpdateUserCredentialHandler
  implements ICommandHandler<UpdateUserCredentialCommand>
{
  constructor(
    private readonly userCredentialService: UserCredentialService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: UpdateUserCredentialCommand): Promise<any> {
    try {
      await this.userCredentialService.deleteCredential({
        userId: command.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
