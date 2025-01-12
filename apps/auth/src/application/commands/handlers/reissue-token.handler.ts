import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReissueTokenCommand } from '@auth/application/commands/reissue-token.command';
import { TokenService } from '@auth/application/services/token.service';
import {
  BaseBusinessException,
  ErrorCode,
  errorFactory,
} from '@libs/exception';
import { Token } from '@auth/domain/entities/token.entity';

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
        throw errorFactory(err.errorCode);
      }
      throw errorFactory(ErrorCode.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
