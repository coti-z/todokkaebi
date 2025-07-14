import { TokenEnum } from 'libs/jwt/src/token.enum';

export interface JwtPayload {
  userId: string;
  type: TokenEnum;
}
export interface JwtPairPayload {
  userId: string;
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
