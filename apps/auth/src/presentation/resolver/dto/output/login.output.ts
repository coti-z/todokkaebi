import { Field, ObjectType } from '@nestjs/graphql';
import { ApiResponseOf } from '@libs/response/api-response-factory';

@ObjectType()
export class LoginOutput {
  @Field()
  id: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
@ObjectType()
export class ApiResponseOfLoginOutput extends ApiResponseOf(LoginOutput) {}
