import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAllCategoriesInput {
  @Field()
  projectId: string;
}
