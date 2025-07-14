import { ApiResponseOf } from '@libs/response';
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
