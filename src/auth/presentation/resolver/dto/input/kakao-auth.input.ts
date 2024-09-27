import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KakaoAuthCodeInput {
  @Field(() => String, {
    description:
      '카카오 로그인 후 받은 인증 코드, 서비스의 회원 가입 또는 로그인에 사용',
  })
  code: string;
}
