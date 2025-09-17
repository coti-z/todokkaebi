import { ApiResponseOf } from '@libs/response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutOutput {
  @Field()
  userId: string;
}

@ObjectType()
export class ApiResponseOfLogoutOutput extends ApiResponseOf(LogoutOutput) {}
