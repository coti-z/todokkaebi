import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCredentialCommand } from '@auth/application/commands/update-user-credential.command';
import { UserCredentialService } from '@auth/application/services/user-credential.service';

@CommandHandler(UpdateUserCredentialCommand)
export class UpdateUserCredentialHandler
  implements ICommandHandler<UpdateUserCredentialCommand>
{
  constructor(private readonly userCredentialService: UserCredentialService) {}

  async execute(command: UpdateUserCredentialCommand): Promise<any> {
    try {
      await this.userCredentialService.deleteCredential({
        userId: command.userId,
      });
    } catch (err) {
      throw err;
    }
  }
}
