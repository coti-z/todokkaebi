import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAuthService } from '@src/auth/application/services/user-auth.service';
import { DeleteUserCommand } from '@src/auth/application/commands/delete-user-info.command';
import { DeleteUser } from '@src/auth/presentation/resolver/dto/object/delete-user.object';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(command: DeleteUserCommand): Promise<DeleteUser> {
    try {
      await this.userAuthService.deleteUser(command.id);
      return { success: true };
    } catch (e) {
      throw e;
    }
  }
}
