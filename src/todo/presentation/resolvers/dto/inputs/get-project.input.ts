import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetProjectInput {
  @Field()
  id: string;
}
