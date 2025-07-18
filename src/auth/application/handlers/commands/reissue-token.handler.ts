import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@auth/application/services/token.service';

import { Token } from '@auth/domain/entities/token.entity';
import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import {
  ApplicationException,
  BaseBusinessException,
  ErrorCode,
} from '@libs/exception';
@CommandHandler(ReissueTokenCommand)
export class ReissueTokenHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: ReissueTokenCommand): Promise<Token> {
    try {
      return await this.tokenService.reissueTokens({
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
