import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { ApiResponseOfLoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { ApiResponseOfLogoutOutput } from '@auth/presentation/resolver/dto/output/logout.output';
import { BasicAuthPresentationMapper } from '@auth/presentation/mapper/basic-auth-presentation.mapper';
import { ResponseManager } from '@libs/response';
import { UseGuards } from '@nestjs/common';
import { JwtPayloadWithToken } from '@libs/jwt';
import { RateLimit, TokenInfo } from '@libs/decorators';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { RequestContextExtractor } from '@libs/exception';

@Resolver()
export class BasicAuthResolver {
  constructor(private readonly commandBus: CommandBus) {}
  @Query(() => String)
  healthCheck() {
    return 'OK';
  }
  @Mutation(() => ApiResponseOfLoginOutput)
  async basicLogin(
    @Args('input') input: LoginInput,
    @Context() gqlContext: any,
  ) {
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

  @Mutation(() => ApiResponseOfLogoutOutput)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async basicLogout(
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ) {
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
