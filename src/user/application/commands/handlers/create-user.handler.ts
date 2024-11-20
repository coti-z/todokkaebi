import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from '@src/user/application/commands/create-user.command';
import { UserModel } from '@src/user/domain/model/user.model';
import { UserService } from '@src/user/domain/services/user.service';
import { CreateUserDto } from '@src/user/domain/model/create-user.model';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}
  async execute(command: CreateUserCommand): Promise<UserModel> {
    await this.userService.validateUserEmailDoesNotExist(command.email);
    try {
      return await this.userService.createUser(
        new CreateUserDto(command.email, command.password, command.nickname),
      );
    } catch (e) {
      throw e;
    }
  }
}
