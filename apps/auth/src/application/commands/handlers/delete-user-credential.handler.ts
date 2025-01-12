import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCredentialCommand } from '@auth/application/commands/delete-user-credential.command';
import { UserCredentialService } from '@auth/application/services/user-credential.service';

@CommandHandler(DeleteUserCredentialCommand)
export class DeleteUserCredentialHandler
  implements ICommandHandler<DeleteUserCredentialCommand>
{
  constructor(private readonly userCredentialService: UserCredentialService) {}

  async execute(command: DeleteUserCredentialCommand): Promise<void> {
    try {
      await this.userCredentialService.deleteCredential({
        userId: command.userId,
      });
    } catch (err) {
      throw err;
    }
  }
}
