import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '@src/auth/domain/model/user.model';
import { TokenPair } from '@src/auth/presentation/resolver/dto/object/token-pair.object';
import { CreateUserInput } from '@src/auth/presentation/resolver/dto/input/create-user.input';
import { CreateUserCommand } from '@src/auth/application/commands/create-user.command';
import { JwtAuthGuard, JwtPayload } from '@libs/jwt';
import { UpdateUserInfoInput } from '@src/auth/presentation/resolver/dto/input/update-user-info.input';
import { UpdateUserInfoCommand } from '@src/auth/application/commands/update-user-info.command';
import { TokenInfo } from '@libs/decorators';
import { AccessToken } from '@src/auth/presentation/resolver/dto/object/access-token.object';
import { ReissueAccessTokenInput } from '../../../../test/utils/graphql.helper';
import { ReissueAccessTokenCommand } from '@src/auth/application/commands/reissue-access-token.command';
import { DeleteUser } from '@src/auth/presentation/resolver/dto/object/delete-user.object';
import { DeleteUserCommand } from '@src/auth/application/commands/delete-user-info.command';
import { GetUserInfoQuery } from '@src/auth/application/queries/get-user-info.query';

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

  @Mutation(() => AccessToken)
  async reissueAccessToken(
    @Args('input') input: ReissueAccessTokenInput,
  ): Promise<AccessToken> {
    const command = new ReissueAccessTokenCommand(input.refreshToken);
    return await this.commandBus.execute(command);
  }
  @Mutation(() => DeleteUser)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@TokenInfo() payload: JwtPayload): Promise<DeleteUser> {
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
