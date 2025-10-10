import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { RequestContextExtractor } from '@libs/exception';
import { JwtPayloadWithToken } from '@libs/jwt';
import { ApiResponse, ResponseManager } from '@libs/response';

import { JwtAuthWithRefreshTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-refresh-token.guard';
import { TokenPresentationMapper } from '@auth/presentation/mapper/token-presentation.mapper';
import {
  ApiResponseOfReissueTokenOutput,
  ReissueTokenOutput,
} from '@auth/presentation/resolver/dto/output/reissue-token.output';

/**
 * Token GraphQL Resolver
 *
 * @description
 * API endpoints responsible for JWT token lifecycle management
 *
 * @remarks
 * **Security:**
 * - reissueToken: Requires valid refresh token authentication
 */
@Resolver()
export class TokenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  // ─────────────────────────────────────
  // Mutation
  // ─────────────────────────────────────

  /**
   * Reissue new access token using refresh token
   *
   * @remarks
   * - Refresh token authentication required
   * - Returns new access token and refresh token pair
   * - Old refresh token is invalidated after successful reissue
   */
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
