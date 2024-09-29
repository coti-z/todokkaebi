import { ReissueAccessTokenCommand } from '@/auth/application/commands/reissue-access-token.command';
import { AccessToken } from '@/auth/presentation/resolver/dto/object/access-token.object';
import { JwtTokenService } from '@/utils/jwt/jwt.service';
import { TokenEnum } from '@/utils/jwt/token.enum';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
