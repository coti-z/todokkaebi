import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { RequestContextExtractor } from '@libs/exception';
import { JwtPayloadWithToken } from '@libs/jwt';
import { ResponseManager } from '@libs/response';

import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { BasicAuthPresentationMapper } from '@auth/presentation/mapper/basic-auth-presentation.mapper';
import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { ApiResponseOfLoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { ApiResponseOfLogoutOutput } from '@auth/presentation/resolver/dto/output/logout.output';

/**
 * BasicAuth GraphQL Resolver
 *
 * @remarks
 * Handles transitional email/password authentication flow.
 *
 * **Security:**
 * - basicLogin: Public endpoint (no authentication)
 * - basicLogout: JWT authentication required
 *
 */
@Resolver()
export class BasicAuthResolver {
  // ─────────────────────────────────────
  // Query
  // ─────────────────────────────────────
  /**
   * Health Check
   *
   * @remarks
   * For Development/testing purposes only
   * @internal For development/test environment only
   */
  constructor(private readonly commandBus: CommandBus) {}
  @Query(() => String)
  healthCheck(): string {
    return 'OK';
  }
  /**
   * Authenticate user with email and password
   *
   * @remarks
   * - Public endpoint (no authentication required)
   * - Returns access token and refresh token
   */
  @Mutation(() => ApiResponseOfLoginOutput)
  async basicLogin(
    @Args('input') input: LoginInput,
    @Context() gqlContext: any,
  ): Promise<ApiResponseOfLoginOutput> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = BasicAuthPresentationMapper.toBasicLoginCommand(
      input,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = BasicAuthPresentationMapper.resultToLoginOutput(result);
    return ResponseManager.success(output);
  }
  /**
   * Log out authenticated user
   *
   * @remarks
   * - JWT authentication required
   * - Invalidates access token (blacklisted in Redis)
   */

  @Mutation(() => ApiResponseOfLogoutOutput)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async basicLogout(
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ): Promise<ApiResponseOfLogoutOutput> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = BasicAuthPresentationMapper.toBasicLogoutCommand(
      {
        accessToken: payload.token,
      },
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = BasicAuthPresentationMapper.resultToLogoutOutput(result);
    return ResponseManager.success(output);
  }
}
