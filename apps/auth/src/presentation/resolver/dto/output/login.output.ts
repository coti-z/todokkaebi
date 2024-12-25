import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field()
  id: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
