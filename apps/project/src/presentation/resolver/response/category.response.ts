import { ObjectType } from '@nestjs/graphql';
import { ApiResponseOf } from '@libs/response/api-response-factory';
import { CreateCategoryOutput } from '@project/presentation/resolver/output/category.output';

@ObjectType()
export class CreateCategoryResponse extends ApiResponseOf(
  CreateCategoryOutput,
) {}
