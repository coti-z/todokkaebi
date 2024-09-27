import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query, UseGuards } from '@nestjs/common';

@Resolver()
export class UserAuthResolver {
  @Query()
  @UseGuards()
  async getUserInfo() {}

  @Mutation()
  @UseGuards()
  async updataUserInfo() {}

  @Mutation()
  @UseGuards()
  async deleteUser(@Args('id') id: number) {}
}
