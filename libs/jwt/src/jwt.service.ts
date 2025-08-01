import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  JwtDecodedToken,
  JwtPairPayload,
  JwtPayload,
  Token,
  TokenEnum,
  TokenPair,
  TokenTimeEnum,
} from '@libs/jwt';
import { ApplicationException, ErrorCode } from '@libs/exception';
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

    return {
      accessToken: accessToken.token,
      accessTokenExpires: accessToken.tokenExpires,
      refreshToken: refreshToken.token,
      refreshTokenExpires: refreshToken.tokenExpires,
    };
  }
  generateToken(payload: JwtPayload): Token {
    const expiresIn = this.getExpirationTime(payload.type);
    const token = this.jwtService.sign(payload, { expiresIn });
    const decoded: JwtDecodedToken = this.jwtService.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);
    return {
      token: token,
      tokenExpires: expiresAt,
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
  verifyRefreshToken(token: string) {
    const payload: JwtPayload = this.jwtService.verify(token);
    if (payload.type !== TokenEnum.REFRESH) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
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
