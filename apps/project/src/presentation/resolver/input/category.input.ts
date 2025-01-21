import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;
}

@InputType()
export class CreateCategoryInput extends PickType(CategoryInput, [
  'projectId',
  'name',
]) {}
