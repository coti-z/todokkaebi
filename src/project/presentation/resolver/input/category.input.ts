import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  categoryId: string;

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

@InputType()
export class DeleteCategoryInput extends PickType(CategoryInput, [
  'categoryId',
]) {}

@InputType()
export class ChangeCategoryNameInput extends PickType(CategoryInput, [
  'categoryId',
  'name',
]) {}

@InputType()
export class QueryCategoryByIdInput extends PickType(CategoryInput, [
  'categoryId',
]) {}
