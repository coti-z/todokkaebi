import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtVerifyResult } from '@/common/jwt/jwt-token.interface';
import { TokenEnum, TokenTimeEnum } from '@/common/jwt/token.enum';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(payload: JwtPayload) {
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
