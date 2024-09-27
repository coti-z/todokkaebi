import { TokenEnum } from '@/common/jwt/token.enum';

export interface JwtPayload {
  email: string;
  userId: string;
  type: TokenEnum;
}

export interface JwtVerifyResult {
  isValid: boolean;
  payload: JwtPayload;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
