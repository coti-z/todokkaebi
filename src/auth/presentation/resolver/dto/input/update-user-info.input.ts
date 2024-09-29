import { Field, InputType } from '@nestjs/graphql';

@InputType({})
export class UpdateUserInfoInput {
  @Field(() => String, { nullable: true })
  nickname: string;

  @Field(() => String, { nullable: true })
  birthday: string;

  @Field(() => String, { nullable: true })
  email: string;
}
