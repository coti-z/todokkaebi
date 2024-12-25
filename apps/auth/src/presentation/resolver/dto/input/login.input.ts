import { Field } from '@nestjs/graphql';

export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
