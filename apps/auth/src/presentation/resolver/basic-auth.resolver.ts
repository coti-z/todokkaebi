import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { BasicLoginCommand } from '@auth/application/commands/basic-login.command';
import { ResponseManager } from '@libs/response';
import { HttpStatus } from '@nestjs/common';
import { LogoutInput } from '@auth/presentation/resolver/dto/input/logout.input';
import { BasicLogoutCommand } from '@auth/application/commands/basic-logout.command';

@Resolver()
export class BasicAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Mutation(() => LoginOutput)
  async basicLogin(@Args('input') input: LoginInput) {
    const command = new BasicLoginCommand(input.email, input.password);
    const data = await this.commandBus.execute(command);
    return ResponseManager.success(data, HttpStatus.OK);
  }
  @Mutation(() => LogoutInput)
  async basicLogout(@Args('input') input: LogoutInput) {
    const command = new BasicLogoutCommand(input.refreshToken);
    const data = await this.commandBus.execute(command);
    return ResponseManager.success(data, HttpStatus.OK);
  }
}
