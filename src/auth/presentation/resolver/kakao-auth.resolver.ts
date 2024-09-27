import { KakaoAuthCodeInput } from '@/auth/presentation/resolver/dto/input/kakao-auth.input';
import { KakaoLoginUrl } from '@/auth/presentation/resolver/dto/object/kakao-login-url.object';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(() => TokenPair)
export class KakaoAuthResolver {
  @Query(() => KakaoLoginUrl)
  async KakaoAuthLogin(): Promise<KakaoLoginUrl> {
    return { url: 'url' };
  }

  @Mutation(() => TokenPair)
  async getKakaoAuthUrl(
    @Args('input') input: KakaoAuthCodeInput,
  ): Promise<TokenPair> {
    console.log(input);
    return {
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
    };
  }
}
