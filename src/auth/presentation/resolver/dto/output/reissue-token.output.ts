import { ApiResponseOf } from '@libs/response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReissueTokenOutput {
  @Field()
  userId: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}

@ObjectType()
export class ApiResponseOfReissueTokenOutput extends ApiResponseOf(
  ReissueTokenOutput,
) {}
