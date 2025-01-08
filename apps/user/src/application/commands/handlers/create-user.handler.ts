import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from '@user/application/commands/create-user.command';
import { UserService } from '@user/application/services/user.service';
import { CreateUserParam } from '@user/application/dto/params/create-user.param';
import { CreateUserResult } from '@user/application/dto/results/create-user.result';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    const user = await this.userService.createUser(
      new CreateUserParam(
        command.email,
        command.nickname,
        command.password,
        command.birthday,
      ),
    );
    return {
      birthday: user.birthday,
      createdAt: user.createdAt,
      email: user.email,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
      id: user.id,
    };
  }
}
