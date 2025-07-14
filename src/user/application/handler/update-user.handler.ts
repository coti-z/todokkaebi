import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import { UpdateUserCommand } from '@user/application/port/in/update-user.command';
import { UserService } from '@user/application/services/user.service';

import { User } from '@user/domain/entity/user.entity';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    return await this.userService.updateUser(
      new UpdateUserParam(
        command.id,
        command.email,
        command.nickname,
        command.birthday,
      ),
    );
  }
}
