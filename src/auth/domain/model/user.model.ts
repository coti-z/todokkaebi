import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field()
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  nickname: string;

  @HideField()
  password: string | null;

  @Field({ nullable: true })
  birthday: Date;

  @HideField()
  createdAt: Date;

  @HideField()
  updatedAt: Date;

  private constructor(init: Partial<UserModel>) {
    Object.assign(this, init);
  }

  static create(init: Partial<UserModel>): UserModel {
    return new UserModel(init);
  }
}
