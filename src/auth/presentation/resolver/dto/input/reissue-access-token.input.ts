import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReissueAccessTokenInput {
  @Field({
    description: '엑세스 토큰을 재발급 받는데에 사용',
  })
  refreshToken: string;
}
