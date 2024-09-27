import { KakaoAuthCommand } from '@/auth/application/commands/kakao-auth.command';
import { KakaoLoginUrlQuery } from '@/auth/application/queries/kakao-login-url.query';
import { KakaoAuthCodeInput } from '@/auth/presentation/resolver/dto/input/kakao-auth.input';
import { KakaoLoginUrl } from '@/auth/presentation/resolver/dto/object/kakao-login-url.object';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(() => TokenPair)
export class KakaoAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Query(() => KakaoLoginUrl)
  async getKakaoLoginUrl(): Promise<KakaoLoginUrl> {
    console.log('run');
    const query = new KakaoLoginUrlQuery();
    return await this.queryBus.execute(query);
  }

  @Mutation(() => TokenPair)
  async kakaoAuth(
    @Args('input') input: KakaoAuthCodeInput,
  ): Promise<TokenPair> {
    const command = new KakaoAuthCommand(input.code);
    return await this.commandBus.execute(command);
  }
}
