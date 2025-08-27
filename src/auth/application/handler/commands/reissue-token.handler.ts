import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Token } from '@auth/domain/entity/token.entity';
import { TokenService } from '@auth/application/service/token.service';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
@CommandHandler(ReissueTokenCommand)
export class ReissueTokenHandler implements ICommandHandler {
  constructor(
    private readonly tokenService: TokenService,
    private readonly tokenByJWTService: TokenByJWTService,
  ) {}
  async execute(command: ReissueTokenCommand): Promise<Token> {
    try {
      const oldToken = await this.tokenService.revokeTokenByRefreshToken({
        refreshToken: command.refreshToken,
      });

      const pairToken = await this.tokenByJWTService.generatePairToken({
        userId: oldToken.userId,
      });

      return await this.tokenService.storeToken({
        accessToken: pairToken.accessToken,
        refreshToken: pairToken.refreshToken,
        refreshTokenExpiresAt: pairToken.refreshTokenExpires,
        userId: oldToken.userId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
