import { KakaoAuthCommand } from '@/auth/application/commands/kakao-auth.command';
import { KakaoAuthService } from '@/auth/application/services/kakao-auth.service';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { JwtTokenService } from '@/utils/jwt/jwt.service';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
