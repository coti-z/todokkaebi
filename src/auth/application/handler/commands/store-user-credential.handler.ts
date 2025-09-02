import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { ErrorHandlingStrategy } from '@libs/exception';

@CommandHandler(StoreUserCredentialCommand)
export class StoreUserCredentialHandler
  implements ICommandHandler<StoreUserCredentialCommand>
{
  constructor(
    private readonly userCredentialService: UserCredentialService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}
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
