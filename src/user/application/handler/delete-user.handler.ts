import { Injectable } from '@nestjs/common';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { DeleteUserCommand } from '@user/application/port/in/delete-user.command';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';
import { ErrorHandlingStrategy } from '@libs/exception';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly userCredentialService: UserCredentialService,
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    try {
      return await this.userService.deleteUser(new DeleteUserParam(command.id));
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
