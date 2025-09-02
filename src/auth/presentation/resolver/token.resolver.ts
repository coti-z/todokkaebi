import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiResponseOfReissueTokenOutput,
  ReissueTokenOutput,
} from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { TokenPresentationMapper } from '@auth/presentation/mapper/token-presentation.mapper';
import { ApiResponse } from '@libs/response';
import { ResponseManager } from '@libs/response';
import { UseGuards } from '@nestjs/common';
import { JwtPayloadWithToken } from '@libs/jwt';
import { TokenInfo } from '@libs/decorators';
import { JwtAuthWithRefreshTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-refresh-token.guard';
import { RequestContextExtractor } from '@libs/exception';

@Resolver()
export class TokenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ApiResponseOfReissueTokenOutput)
  @UseGuards(JwtAuthWithRefreshTokenGuard)
  async reissueToken(
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() context: any,
  ): Promise<ApiResponse<ReissueTokenOutput>> {
    const requestContext = RequestContextExtractor.fromGraphQLContext(context);
    const command = TokenPresentationMapper.toReissueTokenCommand(
      payload.token,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = TokenPresentationMapper.resultToTokenReissueOutput(result);
    return ResponseManager.success(output);
  }
}
