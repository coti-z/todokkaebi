import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Lock } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';

import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { UserCredentialService } from '@auth/application/service/user-credential.service';

@Injectable()
@CommandHandler(StoreUserCredentialCommand)
export class StoreUserCredentialHandler
  implements ICommandHandler<StoreUserCredentialCommand>
{
  constructor(
    private readonly userCredentialService: UserCredentialService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Lock({
    key: args => `store-credential:${args[0].userId}`,
  })
  @Transactional()
  async execute(command: StoreUserCredentialCommand): Promise<void> {
    try {
      await this.userCredentialService.createCredential({
        userId: command.userId,
        passwordHash: command.passwordHash,
        email: command.email,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
