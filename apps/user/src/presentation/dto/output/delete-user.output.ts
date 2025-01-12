import { ApiResponseOf } from '@libs/response/api-response-factory';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserOutput {}

@ObjectType()
export class ApiResponseOfDeleteUserOutput extends ApiResponseOf(
  DeleteUserOutput,
) {}
