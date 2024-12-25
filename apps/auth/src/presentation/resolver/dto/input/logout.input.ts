import { Field } from '@nestjs/graphql';

export class LogoutInput {
  @Field()
  refreshToken: string;
}
