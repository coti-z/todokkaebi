import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class KakaoAuthResolver {
  @Mutation()
  async KakaoAuthLogin() {}

  @Mutation()
  async getKakaoAuthUrl() {}
}
