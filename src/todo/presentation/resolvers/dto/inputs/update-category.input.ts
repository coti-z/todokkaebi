import { Field } from '@nestjs/graphql';

export class UpdateCategoryInput {
  @Field()
  name: string;
}
