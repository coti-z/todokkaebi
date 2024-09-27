import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KakaoLoginUrl {
  @Field(() => String, {
    description: '인증 코드를 받아오기 위한 카카오 로그인 페이지 URL',
  })
  url: string;
}
