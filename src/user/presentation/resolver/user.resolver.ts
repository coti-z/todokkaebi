import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserInput } from '@user/presentation/dto/inputs/update-user.input';

import { CreateUserInput } from '@user/presentation/dto/inputs/create-user.input';
import { UseGuards } from '@nestjs/common';
import { ApiResponseOfCreateUserOutput } from '@user/presentation/dto/output/create-user.output';
import { UserPresentationMapper } from '@user/presentation/mapper/user-presentation.mapper';
import { ApiResponseOfUpdateUserOutput } from '@user/presentation/dto/output/update-user.output';
import { ApiResponseOfDeleteUserOutput } from '@user/presentation/dto/output/delete-user.output';
import { ResponseManager } from '@libs/response';
import { RateLimit, TokenInfo } from '@libs/decorators';
import { JwtPayload } from '@libs/jwt';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { RequestContextExtractor } from '@libs/exception';

@Resolver()
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  async healthCheck() {
    return 'OK';
  }

  @Mutation(() => ApiResponseOfCreateUserOutput)
  @RateLimit({
    limit: 5,
    window: 3600,
    blockDuration: 7200,
    key: args => args[1].input.email,
    errorMessage:
      '회원가입 시도 횟수를 초과했습니다. 2시간 후 다시 시도해주세요.',
  })
  async createUser(
    @Args('input') input: CreateUserInput,
    @Context() gqlContext: any,
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

  @Mutation(() => ApiResponseOfUpdateUserOutput)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
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

  @Mutation(() => ApiResponseOfDeleteUserOutput)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async deleteUser(
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<ApiResponseOfDeleteUserOutput> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = UserPresentationMapper.toDeleteUserCommand(
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = UserPresentationMapper.resultToDeleteUserOutput(result);
    return ResponseManager.success(output);
  }
}
