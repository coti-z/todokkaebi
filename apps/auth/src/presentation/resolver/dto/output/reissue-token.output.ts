import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReissueTokenOutput {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
