import { MutationResponse } from 'test/types/common.types';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginData {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutData {
  userId: string;
}

export interface ReissueTokenData {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = MutationResponse<LoginData, 'basicLogin'>;
export type LogoutResponse = MutationResponse<LogoutData, 'basicLogout'>;
export type ReissueTokenResponse = MutationResponse<
  ReissueTokenData,
  'reissueToken'
>;

export type AuthHealthCheckResponse = { healthCheck: string };
