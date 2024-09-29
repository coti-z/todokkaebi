import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: '유저를 생성하기 위한 필드',
})
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  nickname: string;
}
