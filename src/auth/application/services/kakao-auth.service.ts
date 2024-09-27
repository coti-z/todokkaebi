import { UserModel } from '@/auth/domain/model/user.model';
import { UserRepository } from '@/auth/infrastructure/database/repository/user.repository';
import { KakaoAuth } from '@/auth/infrastructure/kakao/auth/kakao.auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoAuthService {
  constructor(
    private readonly kakaoAuth: KakaoAuth,
    private readonly userRepository: UserRepository,
  ) {}

  async getKakaoAuthUrl(): Promise<string> {
    return this.kakaoAuth.getAuthorizationUrl();
  }

  async kakaoLogin(code: string): Promise<UserModel> {
    const kakaoToken = await this.kakaoAuth.getToken(code);
    const kakaoUser = await this.kakaoAuth.getUser(kakaoToken.access_token);

    return await this.userRepository.createUser({
      email: kakaoUser.email,
      nickname: kakaoUser.properties.nickname,
      OAuthProvider: {
        create: {
          provider: 'KAKAO',
          providerId: kakaoUser.id.toString(),
        },
      },
    });
  }
}