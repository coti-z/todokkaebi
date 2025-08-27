import { ReissueTokenOutput } from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import { Token } from '@auth/domain/entity/token.entity';

export class TokenPresentationMapper {
  static toReissueTokenCommand(refreshToken: string): ReissueTokenCommand {
    return new ReissueTokenCommand(refreshToken);
  }

  static resultToTokenReissueOutput(data: Token): ReissueTokenOutput {
    return {
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
