import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import {
  CreateCategoryOutput,
  DeleteCategoryOutput,
  QueryCategoryByIdOutput,
  UpdateCategoryOutput,
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
export class UpdateCategoryResponse extends ApiResponseOf(
  UpdateCategoryOutput,
) {}

@ObjectType()
export class QueryCategoryByIdResponse extends ApiResponseOf(
  QueryCategoryByIdOutput,
) {}
