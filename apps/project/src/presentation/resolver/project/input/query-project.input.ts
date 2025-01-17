import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QueryProjectInput {
  @Field()
  projectId: string;
}
