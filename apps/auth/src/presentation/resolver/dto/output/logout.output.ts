import { Field, ObjectType } from '@nestjs/graphql';
import { ApiResponseOf } from '@libs/response/api-response-factory';

@ObjectType()
export class LogoutOutput {
  @Field()
  success: boolean;
}

@ObjectType()
export class ApiResponseOfLogoutOutput extends ApiResponseOf(LogoutOutput) {}
