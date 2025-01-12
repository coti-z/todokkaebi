import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@user/application/commands/delete-user.command';
import { UserService } from '@user/application/services/user.service';
import { DeleteUserParam } from '@user/application/dto/params/delete-user.param';
import { User } from '@user/domain/entity/user.entity';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute(command: DeleteUserCommand): Promise<User> {
    return await this.userService.deleteUser(new DeleteUserParam(command.id));
  }
}
