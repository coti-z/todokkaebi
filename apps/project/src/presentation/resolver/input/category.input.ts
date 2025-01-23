import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;

  @Field()
  categoryId: string;
}

@InputType()
export class CreateCategoryInput extends PickType(CategoryInput, [
  'projectId',
  'name',
]) {}

@InputType()
export class DeleteCategoryInput extends PickType(CategoryInput, [
  'categoryId',
]) {}
