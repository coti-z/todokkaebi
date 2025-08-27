import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';

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
