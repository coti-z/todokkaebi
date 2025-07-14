import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LogoutInput {
  @Field()
  refreshToken: string;
}
