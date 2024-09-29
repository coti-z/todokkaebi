import { KakaoAuthCommand } from '@/auth/application/commands/kakao-auth.command';
import { ReissueAccessTokenCommand } from '@/auth/application/commands/reissue-access-token.command';
import { KakaoLoginUrlQuery } from '@/auth/application/queries/kakao-login-url.query';
import { KakaoAuthCodeInput } from '@/auth/presentation/resolver/dto/input/kakao-auth.input';
import { AccessToken } from '@/auth/presentation/resolver/dto/object/access-token.object';
import { KakaoLoginUrl } from '@/auth/presentation/resolver/dto/object/kakao-login-url.object';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

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
  async getKakaoLoginUrl(): Promise<KakaoLoginUrl> {
    const query = new KakaoLoginUrlQuery();
    return await this.queryBus.execute(query);
  }

  @Mutation(() => TokenPair, {
    description: 'code를 보내어, 회원가입 및 로그인을 하여 토큰을 받습니다.',
  })
  async kakaoAuth(
    @Args('input') input: KakaoAuthCodeInput,
  ): Promise<TokenPair> {
    const command = new KakaoAuthCommand(input.code);
    return await this.commandBus.execute(command);
  }
}
