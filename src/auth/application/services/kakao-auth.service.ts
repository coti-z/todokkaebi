import { Injectable } from '@nestjs/common';
import { KakaoAuthCommand } from '@src/auth/application/commands/kakao-auth.command';
import { KakaoAuth } from '@src/auth/infrastructure/kakao/auth/kakao.auth';
import { UserRepository } from '@src/auth/infrastructure/database/repository/user.repository';
import { UserModel } from '@src/auth/domain/model/user.model';

@Injectable()
export class KakaoAuthService {
  constructor(
    private readonly kakaoAuth: KakaoAuth,
    private readonly userRepository: UserRepository,
  ) {}

  async getKakaoAuthUrl(test: boolean): Promise<string> {
    return this.kakaoAuth.getAuthorizationUrl(test);
  }

  async kakaoLogin(command: KakaoAuthCommand): Promise<UserModel> {
    const kakaoToken = await this.kakaoAuth.getToken(
      command.code,
      command.isTest,
    );
    const kakaoUser = await this.kakaoAuth.getUser(kakaoToken.access_token);

    const user = await this.userRepository.getKakaoUser(
      kakaoUser.id.toString(),
    );

    if (!user) {
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
    return user;
  }
}
