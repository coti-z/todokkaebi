import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReissueTokenInput {
  @Field()
  refreshToken: string;
}
