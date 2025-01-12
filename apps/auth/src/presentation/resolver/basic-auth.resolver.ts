import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { ResponseManager } from '@libs/response';
import { LogoutInput } from '@auth/presentation/resolver/dto/input/logout.input';
import { ApiResponseOfLoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { ApiResponseOfLogoutOutput } from '@auth/presentation/resolver/dto/output/logout.output';
import { BasicAuthPresentationMapper } from '@auth/presentation/mapper/basic-auth-presentation.mapper';

@Resolver()
export class BasicAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Query(() => String)
  healthCheck() {
    return 'OK';
  }
  @Mutation(() => ApiResponseOfLoginOutput)
  async basicLogin(@Args('input') input: LoginInput) {
    const command = BasicAuthPresentationMapper.toBasicLoginCommand(input);
    const result = await this.commandBus.execute(command);
    const output = BasicAuthPresentationMapper.resultToLoginOutput(result);
    return ResponseManager.success(output);
  }
  @Mutation(() => ApiResponseOfLogoutOutput)
  async basicLogout(@Args('input') input: LogoutInput) {
    const command = BasicAuthPresentationMapper.toBasicLogoutCommand(input);
    const result = await this.commandBus.execute(command);
    const output = BasicAuthPresentationMapper.resultToLogoutOutput(result);
    return ResponseManager.success(output);
  }
}
