import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
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
