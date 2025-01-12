import { Field, ObjectType } from '@nestjs/graphql';
import { ApiResponseOf } from '@libs/response/api-response-factory';

@ObjectType()
export class ReissueTokenOutput {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}

@ObjectType()
export class ApiResponseOfReissueTokenOutput extends ApiResponseOf(
  ReissueTokenOutput,
) {}
