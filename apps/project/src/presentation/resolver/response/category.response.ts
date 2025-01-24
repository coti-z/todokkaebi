import { ObjectType } from '@nestjs/graphql';
import { ApiResponseOf } from '@libs/response';
import {
  CreateCategoryOutput,
  DeleteCategoryOutput,
  UpdateCategoryOutput,
} from '@project/presentation/resolver/output/category.output';
import { ObjectTypeDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/object-type-definition.factory';

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
