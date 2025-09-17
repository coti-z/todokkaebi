import { ApiResponseOf } from '@libs/response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field()
  userId: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
@ObjectType()
export class ApiResponseOfLoginOutput extends ApiResponseOf(LoginOutput) {}
