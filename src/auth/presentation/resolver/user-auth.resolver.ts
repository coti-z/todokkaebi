import { CreateUserCommand } from '@/auth/application/commands/create-user.command';
import { DeleteUserCommand } from '@/auth/application/commands/delete-user-info.command';
import { UpdateUserInfoCommand } from '@/auth/application/commands/update-user-info.command';
import { GetUserInfoQuery } from '@/auth/application/queries/get-user-info.query';
import { UserModel } from '@/auth/domain/model/user.model';
import { CreateUserInput } from '@/auth/presentation/resolver/dto/input/create-user.input';
import { UpdateUserInfoInput } from '@/auth/presentation/resolver/dto/input/update-user-info.input';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { TokenInfo } from '@/utils/decorators/token-info.decorator';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { JwtPayload } from '@/utils/jwt/jwt-token.interface';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver(() => UserModel)
export class UserAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TokenPair)
  async createUser(@Args('input') input: CreateUserInput): Promise<TokenPair> {
    const command = new CreateUserCommand(
      input.email,
      input.nickname,
      input.password,
    );
    return await this.commandBus.execute(command);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async updateUserInfo(
    @Args('input') input: UpdateUserInfoInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<UserModel> {
    const command = new UpdateUserInfoCommand(
      payload.userId,
      input.email,
      input.nickname,
      input.birthday,
    );
    return await this.commandBus.execute(command);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@TokenInfo() payload: JwtPayload): Promise<boolean> {
    const command = new DeleteUserCommand(payload.userId);
    return await this.commandBus.execute(command);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@TokenInfo() payload: JwtPayload): Promise<UserModel> {
    const query = new GetUserInfoQuery(payload.userId);
    return await this.queryBus.execute(query);
  }
}
