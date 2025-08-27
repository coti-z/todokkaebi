import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';

@CommandHandler(StoreUserCredentialCommand)
export class StoreUserCredentialHandler
  implements ICommandHandler<StoreUserCredentialCommand>
{
  constructor(private readonly userCredentialService: UserCredentialService) {}
  async execute(command: StoreUserCredentialCommand): Promise<void> {
    try {
      await this.userCredentialService.createCredential({
        userId: command.userId,
        passwordHash: command.passwordHash,
        email: command.email,
      });
    } catch (err) {
      throw err;
    }
  }
}
