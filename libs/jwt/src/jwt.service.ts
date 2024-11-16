import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  JwtPairPayload,
  JwtPayload,
  JwtVerifyResult,
  TokenPair,
} from '@libs/jwt/jwt-token.interface';
import { TokenEnum, TokenTimeEnum } from '@libs/jwt/token.enum';
import { ErrorCode, errorFactory } from '@libs/exception';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokenPair(payload: JwtPairPayload): TokenPair {
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
      if (payload.type !== TokenEnum.ACCESS) {
        throw errorFactory(ErrorCode.INVALID_TOKEN);
      }
      return { isValid: true, payload };
    } catch {
      throw errorFactory(ErrorCode.INVALID_TOKEN);
    }
  }
  verifyRefreshToken(token: string): JwtVerifyResult {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      if (payload.type !== TokenEnum.REFRESH) {
        throw errorFactory(ErrorCode.INVALID_TOKEN);
      }
      return { isValid: true, payload };
    } catch {
      throw errorFactory(ErrorCode.INVALID_TOKEN);
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
