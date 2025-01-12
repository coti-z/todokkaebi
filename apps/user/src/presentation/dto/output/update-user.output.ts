import { ApiResponseOf } from '@libs/response/api-response-factory';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserOutput {}

@ObjectType()
export class ApiResponseOfUpdateUserOutput extends ApiResponseOf(
  UpdateUserOutput,
) {}
