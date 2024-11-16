import { TokenEnum } from '@libs/jwt/token.enum';

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
  refreshToken: string;
}
