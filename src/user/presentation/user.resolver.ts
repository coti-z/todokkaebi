import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../domain/model/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserInput } from '@src/user/presentation/dto/input/create-user.input';
import { ResponseManager, ResponseObj } from '@libs/response';
import { CreateUserCommand } from '@src/user/application/commands/create-user.command';
import { DeleteUserCommand } from '@src/user/application/commands/delete-user.command';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, JwtPayload } from '@libs/jwt';
import { TokenInfo } from '@libs/decorators';
import { UpdateUserInput } from '@src/user/presentation/dto/input/update-user.input';
import { UpdateUserCommand } from '@src/user/application/commands/update-user.command';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => UserModel)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<ResponseObj<UserModel>> {
    const command = new UpdateUserCommand(
      payload.userId,
      input.nickname,
      input.email,
      input.password,
    );
    const user = await this.commandBus.execute(command);
    return ResponseManager.from(user);
  }
  @Mutation(() => UserModel)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<ResponseObj<UserModel>> {
    const command = new CreateUserCommand(
      input.email,
      input.nickname,
      input.password,
    );
    const user = await this.commandBus.execute(command);
    return ResponseManager.from(user);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@TokenInfo() payload: JwtPayload) {
    const command = new DeleteUserCommand(payload.userId);
    const user = await this.commandBus.execute(command);
    return ResponseManager.from(user);
  }
}
