import { Field, ObjectType } from '@nestjs/graphql';

import { ApiResponseOf } from '@libs/response';

@ObjectType()
export class DeleteUserOutput {
  @Field()
  userId: string;
}

@ObjectType()
export class ApiResponseOfDeleteUserOutput extends ApiResponseOf(
  DeleteUserOutput,
) {}
