import { KakaoAuthCommand } from '@/auth/application/commands/kakao-auth.command';
import { KakaoLoginUrlQuery } from '@/auth/application/queries/kakao-login-url.query';
import { GetKakaoLoginUrlInput } from '@/auth/presentation/resolver/dto/input/get-kakao-login-url.input';
import { KakaoAuthCodeInput } from '@/auth/presentation/resolver/dto/input/kakao-auth.input';
import { KakaoLoginUrl } from '@/auth/presentation/resolver/dto/object/kakao-login-url.object';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => TokenPair)
export class KakaoAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Query(() => KakaoLoginUrl, {
    description:
      '카카오 토큰을 발급을 위한 code를 받기 위해서, 카카오 로그인 페이지를 받아오는 곳',
  })
  async getKakaoLoginUrl(
    @Args('input') input: GetKakaoLoginUrlInput,
  ): Promise<KakaoLoginUrl> {
    const query = new KakaoLoginUrlQuery(input.test);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => TokenPair, {
    description: 'code를 보내어, 회원가입 및 로그인을 하여 토큰을 받습니다.',
  })
  async kakaoAuth(
    @Args('input') input: KakaoAuthCodeInput,
  ): Promise<TokenPair> {
    console.log(input);
    const command = new KakaoAuthCommand(input.test, input.code);
    return await this.commandBus.execute(command);
  }
}
