import { CreateJwtParam } from '@auth/application/dto/params/create-jwt-token.param';
import {
  JwtPayload,
  JwtDecodedToken,
  Token,
  TokenPair,
  TokenEnum,
  TokenTimeEnum,
} from '@libs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenByJWTService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generatePairToken(createJWTParam: CreateJwtParam): Promise<TokenPair> {
    const accessToken = await this.generateAccessToken(createJWTParam.userId);
    const refreshToken = await this.generateRefreshToken(createJWTParam.userId);

    return {
      accessToken: accessToken.token,
      accessTokenExpires: accessToken.tokenExpires,
      refreshToken: refreshToken.token,
      refreshTokenExpires: refreshToken.tokenExpires,
    };
  }

  async generateAccessToken(userId: string): Promise<Token> {
    const jti = `${userId}-${TokenEnum.ACCESS}-${Date.now()}`;
    const payload: JwtPayload = {
      jti,
      type: TokenEnum.ACCESS,
      userId,
    };

    const expiresIn = this.getExpirationTime(payload.type);
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    const decoded: JwtDecodedToken = this.jwtService.decode(token);
    const tokenExpires = new Date(decoded.exp * 1000);

    return {
      token,
      tokenExpires,
    };
  }

  async generateRefreshToken(userId: string): Promise<Token> {
    const jti = `${userId}-${TokenEnum.REFRESH}-${Date.now()}`;
    const payload: JwtPayload = {
      jti,
      type: TokenEnum.REFRESH,
      userId,
    };

    const expiresIn = this.getExpirationTime(payload.type);
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    const decoded: JwtDecodedToken = this.jwtService.decode(token);
    const tokenExpires = new Date(decoded.exp * 1000);

    return {
      token,
      tokenExpires,
    };
  }

  private getExpirationTime(tokenType: TokenEnum) {
    return this.configService.get<string>(
      tokenType === TokenEnum.REFRESH
        ? TokenTimeEnum.REFRESH
        : TokenTimeEnum.ACCESS,
    );
  }
}
