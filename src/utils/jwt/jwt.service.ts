import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import {
  JwtPairPayload,
  JwtPayload,
  JwtVerifyResult,
} from '@/utils/jwt/jwt-token.interface';
import { TokenEnum, TokenTimeEnum } from '@/utils/jwt/token.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokenPair(payload: JwtPairPayload): TokenPair {
    console.log(this.configService.get<string>('JWT_SECRET'));
    const accessToken = this.generateToken({
      ...payload,
      type: TokenEnum.ACCESS,
    });
    const refreshToken = this.generateToken({
      ...payload,
      type: TokenEnum.REFRESH,
    });

    return { accessToken, refreshToken };
  }
  generateToken(payload: JwtPayload): string {
    const expiresIn = this.getExpirationTime(payload.type);

    return this.jwtService.sign(payload, { expiresIn });
  }

  verifyToken(token: string): JwtVerifyResult {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      return { isValid: true, payload };
    } catch (error) {
      throw error;
    }
  }

  // 30m, 3d
  private getExpirationTime(tokenType: TokenEnum) {
    return this.configService.get<string>(
      tokenType == TokenEnum.REFRESH
        ? TokenTimeEnum.REFRESH
        : TokenTimeEnum.ACCESS,
    );
  }
}
