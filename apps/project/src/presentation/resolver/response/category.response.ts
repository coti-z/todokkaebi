import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import {
  ChangeCategoryNameOutput,
  CreateCategoryOutput,
  DeleteCategoryOutput,
  QueryCategoryByIdOutput,
} from '@project/presentation/resolver/output/category.output';

@ObjectType()
export class CreateCategoryResponse extends ApiResponseOf(
  CreateCategoryOutput,
) {}
@ObjectType()
export class DeleteCategoryResponse extends ApiResponseOf(
  DeleteCategoryOutput,
) {}

@ObjectType()
export class ChangeCategoryNameResponse extends ApiResponseOf(
  ChangeCategoryNameOutput,
) {}

@ObjectType()
export class QueryCategoryByIdResponse extends ApiResponseOf(
  QueryCategoryByIdOutput,
) {}
