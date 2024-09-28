import { UserModel } from '@/auth/domain/model/user.model';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserModel)
export class UserAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async getUserInfo() {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async updateUserInfo() {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async deleteUser() {}
}
