import { ApiResponseOf } from '@libs/response/api-response-factory';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserOutput {
  @Field()
  userId: string;
}

@ObjectType()
export class ApiResponseOfUpdateUserOutput extends ApiResponseOf(
  UpdateUserOutput,
) {}
