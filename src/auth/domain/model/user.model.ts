import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field()
  birthday: Date;

  @Field()
  @HideField()
  createdAt: Date;

  @Field()
  @HideField()
  updatedAt: Date;

  private constructor(init: Partial<UserModel>) {
    Object.assign(this, init);
  }

  static create(init: Partial<UserModel>): UserModel {
    return new UserModel(init);
  }
}
