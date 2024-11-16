import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAuthService } from '@src/auth/application/services/user-auth.service';
import { UpdateUserInfoCommand } from '@src/auth/application/commands/update-user-info.command';
import { UserModel } from '@src/auth/domain/model/user.model';

@Injectable()
@CommandHandler(UpdateUserInfoCommand)
export class UpdateUserInfoHandler
  implements ICommandHandler<UpdateUserInfoCommand>
{
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(command: UpdateUserInfoCommand): Promise<UserModel> {
    try {
      return await this.userAuthService.updateUser(command);
    } catch (e) {
      throw e;
    }
  }
}
