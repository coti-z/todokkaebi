import { ReissueTokenInput } from '@auth/presentation/resolver/dto/input/reissue-token.input';
import { Token } from '@auth/domain/entity/token.entity';
import { ReissueTokenOutput } from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';

export class TokenPresentationMapper {
  static toReissueTokenCommand(input: ReissueTokenInput): ReissueTokenCommand {
    return {
      refreshToken: input.refreshToken,
    };
  }

  static resultToTokenReissueOutput(data: Token): ReissueTokenOutput {
    return {
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
