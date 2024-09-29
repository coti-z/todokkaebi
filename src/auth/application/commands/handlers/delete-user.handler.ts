import { DeleteUserCommand } from '@/auth/application/commands/delete-user-info.command';
import { UserAuthService } from '@/auth/application/services/user-auth.service';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(command: DeleteUserCommand): Promise<boolean> {
    try {
      await this.userAuthService.deleteUser(command.id);
      return true;
    } catch (e) {
      throw e;
    }
  }
}
