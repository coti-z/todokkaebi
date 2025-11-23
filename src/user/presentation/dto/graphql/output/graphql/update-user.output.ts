import { Field, ObjectType } from '@nestjs/graphql';

import { ApiResponseOf } from '@libs/response';

@ObjectType()
export class UpdateUserOutput {
  @Field()
  userId: string;
}

@ObjectType()
export class ApiResponseOfUpdateUserOutput extends ApiResponseOf(
  UpdateUserOutput,
) {}
