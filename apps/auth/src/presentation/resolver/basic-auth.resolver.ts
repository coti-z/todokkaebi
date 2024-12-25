import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ResponseManager } from '@libs/response';
import { LoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { LogoutInput } from '@auth/presentation/resolver/dto/input/logout.input';
import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { BasicLoginCommand } from '@auth/application/commands/basic-login.command';
import { HttpStatus } from '@nestjs/common';
import { BasicLogoutCommand } from '@auth/application/commands/basic-logout.command';

@Resolver()
export class BasicAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Mutation(() => ApiResponse<LoginOutput>)
  async basicLogin(@Args('input') input: LoginInput) {
    const command = new BasicLoginCommand(input.email, input.password);
    const data = await this.commandBus.execute(command);
    return ResponseManager.success(data, HttpStatus.OK);
  }
  @Mutation(() => ApiResponse<LogoutInput>)
  async basicLogout(@Args('input') input: LogoutInput) {
    const command = new BasicLogoutCommand(input.refreshToken);
    const data = await this.commandBus.execute(command);
    return ResponseManager.success(data, HttpStatus.OK);
  }
}
