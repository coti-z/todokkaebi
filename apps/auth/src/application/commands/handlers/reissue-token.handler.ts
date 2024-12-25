import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReissueTokenCommand } from '@auth/application/commands/reissue-token.command';
import { ReissueTokenOutput } from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { TokenService } from '@auth/application/services/token.service';
import {
  BaseBusinessException,
  ErrorCode,
  errorFactory,
} from '@libs/exception';

@CommandHandler(ReissueTokenCommand)
export class ReissueTokenHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: ReissueTokenCommand): Promise<ReissueTokenOutput> {
    try {
      const token = await this.tokenService.reissueTokens({
        refreshToken: command.refreshToken,
      });
      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    } catch (err) {
      if (err instanceof BaseBusinessException) {
        throw errorFactory(err.errorCode);
      }
      throw errorFactory(ErrorCode.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
