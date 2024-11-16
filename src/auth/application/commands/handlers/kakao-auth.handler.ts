import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtTokenService, TokenPair } from '@libs/jwt';
import { KakaoAuthService } from '@src/auth/application/services/kakao-auth.service';
import { KakaoAuthCommand } from '@src/auth/application/commands/kakao-auth.command';

@Injectable()
@CommandHandler(KakaoAuthCommand)
export class KakaoAuthHandler implements ICommandHandler<KakaoAuthCommand> {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly kakaoAuthService: KakaoAuthService,
  ) {}

  async execute(cmd: KakaoAuthCommand): Promise<TokenPair> {
    try {
      const user = await this.kakaoAuthService.kakaoLogin(cmd);
      return this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
    } catch (e) {
      throw e;
    }
  }
}
