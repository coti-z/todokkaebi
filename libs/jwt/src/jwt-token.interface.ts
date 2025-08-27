import { TokenEnum } from 'libs/jwt/src/token.enum';

export interface JwtPayload {
  userId: string;
  type: TokenEnum;
  jti: string;
}

export interface JwtPayloadWithToken extends JwtPayload {
  token: string;
}

export interface JwtPairPayload {
  userId: string;
}
export interface JwtDecodedToken {
  userId: string;
  type: TokenEnum;
  iat: number;
  exp: number;
}

export interface JwtVerifyResult {
  isValid: boolean;
  payload: JwtPayload;
}

export interface TokenPair {
  accessToken: string;
  accessTokenExpires: Date;
  refreshToken: string;
  refreshTokenExpires: Date;
}

export interface Token {
  token: string;
  tokenExpires: Date;
}
