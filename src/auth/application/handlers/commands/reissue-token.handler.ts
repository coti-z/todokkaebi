import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@auth/application/services/token.service';

import { Token } from '@auth/domain/entity/token.entity';
import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import { ErrorHandlingStrategy } from '@libs/exception';
@CommandHandler(ReissueTokenCommand)
export class ReissueTokenHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: ReissueTokenCommand): Promise<Token> {
    try {
      await this.tokenService.verifyToken(command.refreshToken);
      const token = await this.tokenService.revokeTokenByRefreshToken({
        refreshToken: command.refreshToken,
      });
      return await this.tokenService.reissueAccessTokensByToken({
        token,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
