import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KakaoAuthService } from '@src/auth/application/services/kakao-auth.service';
import { KakaoLoginUrlQuery } from '@src/auth/application/queries/kakao-login-url.query';
import { KakaoLoginUrl } from '@src/auth/presentation/resolver/dto/object/kakao-login-url.object';


@Injectable()
@QueryHandler(KakaoLoginUrlQuery)
export class KakaoLoginUrlHandler implements IQueryHandler<KakaoLoginUrlQuery> {
  constructor(private readonly kakaoAuthService: KakaoAuthService) {}
  async execute(query: KakaoLoginUrlQuery): Promise<KakaoLoginUrl> {
    try {
      const url = await this.kakaoAuthService.getKakaoAuthUrl(query.test);
      return { url };
    } catch (e) {
      throw e;
    }
  }
}
