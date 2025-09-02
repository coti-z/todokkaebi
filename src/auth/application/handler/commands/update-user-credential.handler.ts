import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Inject, Injectable } from '@nestjs/common';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';

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
