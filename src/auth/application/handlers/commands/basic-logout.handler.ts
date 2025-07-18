import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@auth/application/services/token.service';

import { Token } from '@auth/domain/entities/token.entity';
import { BasicLogoutCommand } from '@auth/application/port/in/commands/basic-logout.command';
import {
  ApplicationException,
  BaseBusinessException,
  ErrorCode,
} from '@libs/exception';

@CommandHandler(BasicLogoutCommand)
export class BasicLogoutHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: BasicLogoutCommand): Promise<Token> {
    try {
      return await this.tokenService.revokeToken({
        refreshToken: command.refreshToken,
      });
    } catch (err) {
      if (err instanceof BaseBusinessException) {
        throw new ApplicationException(err.errorCode);
      }
      throw new ApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }
}
