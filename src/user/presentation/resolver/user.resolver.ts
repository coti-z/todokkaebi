import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { GraphQLContext, RequestContextExtractor } from '@libs/exception';
import { JwtPayload } from '@libs/jwt';
import { ResponseManager } from '@libs/response';

import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';

import { CreateUserInput } from '@user/presentation/dto/graphql/inputs/graphql/create-user.input';
import { UpdateUserInput } from '@user/presentation/dto/graphql/inputs/graphql/update-user.input';
import { ApiResponseOfCreateUserOutput } from '@user/presentation/dto/graphql/output/graphql/create-user.output';
import { ApiResponseOfUpdateUserOutput } from '@user/presentation/dto/graphql/output/graphql/update-user.output';
import { UserPresentationMapper } from '@user/presentation/mapper/user-presentation.mapper';

/**
 * user manager Graphql Resolver
 *
 * @description
 * API endpoints responsible for creating, updating, and deleting users
 *
 * @remarks
 * **security:**
 * - createUser: no authentication, Rate Limiting apply
 * - updateUser/deleteUser: JWT authentication required
 *
 */
@Resolver()
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

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
  @Query(() => String)
  async healthCheck(): Promise<string> {
    return 'OK';
  }

  // ─────────────────────────────────────
  // Mutation
  // ─────────────────────────────────────

  /**
   *  Create new user (Sign up)
   * @remarks
   * - Public endpoint (no authentication required)
   * - Rate limiting: 5 attempts per hour per email
   * - Block duration: 2 hours after limit exceeded
   */
  /* @RateLimit({
    limit: 5,
    window: 3600,
    blockDuration: 7200,
    key: args => args[1].input.email,
    errorMessage:
      '회원가입 시도 횟수를 초과했습니다. 2시간 후 다시 시도해주세요.',
  }) */
  @Mutation(() => ApiResponseOfCreateUserOutput)
  async createUser(
    @Args('input') input: CreateUserInput,
    @Context() gqlContext: GraphQLContext,
  ): Promise<ApiResponseOfCreateUserOutput> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = UserPresentationMapper.toCreateUserCommand(
      input,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = UserPresentationMapper.resultToCreateUserOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Update user profile
   *
   * @remark
   * - JWT authentication required
   * - User can only update their own profile
   * - UserId extracted from JWT token
   */
  @Mutation(() => ApiResponseOfUpdateUserOutput)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: GraphQLContext,
  ): Promise<ApiResponseOfUpdateUserOutput> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = UserPresentationMapper.toUpdateUserCommand(
      payload.userId,
      input,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = UserPresentationMapper.resultToUpdateUserOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Delete user account
   *
   * @remarks
   * - JWT authentication required
   * - User can only delete their own account
   * - UserID extracted from JWT token
   * - Permanent deletion (cannot be undone)
   */
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async deleteUser(
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: GraphQLContext,
  ): Promise<boolean> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = UserPresentationMapper.toDeleteUserCommand(
      payload.userId,
      requestContext,
    );
    await this.commandBus.execute(command);
    return true;
  }
}
