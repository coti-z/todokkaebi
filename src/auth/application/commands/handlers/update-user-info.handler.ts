import { UpdateUserInfoCommand } from '@/auth/application/commands/update-user-info.command';
import { UserAuthService } from '@/auth/application/services/user-auth.service';
import { UserModel } from '@/auth/domain/model/user.model';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
