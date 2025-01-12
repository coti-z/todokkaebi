import { ApiResponseOf } from '@libs/response/api-response-factory';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserOutput {
  @Field()
  userId: string;
}

@ObjectType()
export class ApiResponseOfDeleteUserOutput extends ApiResponseOf(
  DeleteUserOutput,
) {}
