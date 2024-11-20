import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '@src/user/application/commands/update-user.command';
import { UserService } from '@src/user/domain/services/user.service';
import { UserModel } from '@src/auth/domain/model/user.model';
import { UpdateUserDto } from '@src/user/domain/model/update-user.model';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute(command: UpdateUserCommand): Promise<UserModel> {
    await this.userService.validateUserExists(command.id);
    try {
      const dto = new UpdateUserDto(
        command.id,
        command.nickname,
        command.email,
        command.password,
      );
      return await this.userService.updateUser(dto);
    } catch (e) {
      throw e;
    }
  }
}
