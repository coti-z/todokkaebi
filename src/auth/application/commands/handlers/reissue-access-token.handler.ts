import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtTokenService, TokenEnum } from '@libs/jwt';
import { ReissueAccessTokenCommand } from '@src/auth/application/commands/reissue-access-token.command';
import { AccessToken } from '@src/auth/presentation/resolver/dto/object/access-token.object';

@Injectable()
@CommandHandler(ReissueAccessTokenCommand)
export class ReissueAccessTokenHandler
  implements ICommandHandler<ReissueAccessTokenCommand>
{
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async execute(command: ReissueAccessTokenCommand): Promise<AccessToken> {
    try {
      const result = this.jwtTokenService.verifyRefreshToken(
        command.refreshToken,
      );
      const accessToken = this.jwtTokenService.generateToken({
        userId: result.payload.userId,
        type: TokenEnum.ACCESS,
      });
      return { accessToken };
    } catch (e) {
      throw e;
    }
  }
}
