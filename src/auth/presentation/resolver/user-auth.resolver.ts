import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserAuthResolver {
  @UseGuards()
  async getUserInfo() {}

  @Mutation()
  @UseGuards()
  async updataUserInfo() {}

  @Mutation()
  @UseGuards()
  async deleteUser() {}
}
