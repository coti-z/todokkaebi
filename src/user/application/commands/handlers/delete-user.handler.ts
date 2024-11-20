import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserModel } from '@src/user/domain/model/user.model';
import { UserService } from '@src/user/domain/services/user.service';
import { DeleteUserCommand } from '@src/user/application/commands/delete-user.command';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute(command: DeleteUserCommand): Promise<UserModel> {
    await this.userService.validateUserExists(command.id);
    try {
      return await this.userService.deleteUser(command.id);
    } catch (e) {
      throw e;
    }
  }
}
