import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAllTaskWithCategoryIdInput {
  @Field()
  categoryId: string;
}
