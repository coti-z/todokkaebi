import { RequestContext } from '@libs/exception';

import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import { Token } from '@auth/domain/entity/token.entity';
import { ReissueTokenOutput } from '@auth/presentation/resolver/dto/output/reissue-token.output';

export class TokenPresentationMapper {
  static toReissueTokenCommand(
    refreshToken: string,
    context: RequestContext,
  ): ReissueTokenCommand {
    return new ReissueTokenCommand(refreshToken, context);
  }

  static resultToTokenReissueOutput(data: Token): ReissueTokenOutput {
    return {
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
