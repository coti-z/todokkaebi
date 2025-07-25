export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserData {
  id: string;
  email: string;
  nickname: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutData {
  userId: string;
}

export type UserIdData = { userId: Pick<UserData, 'id'>['id'] };

// 제네릭 헬퍼 타입
export type MutationResponse<T, K extends string> = {
  [P in K]: ApiResponse<T>;
};

export type CreateUserResponse = MutationResponse<UserData, 'createUser'>;
export type UpdateUserResponse = MutationResponse<UserIdData, 'updateUser'>;
export type DeleteUserReponse = MutationResponse<UserIdData, 'deleteUser'>;
export type LoginResponse = MutationResponse<LoginData, 'basicLogin'>;
export type LogoutResponse = MutationResponse<LogoutData, 'basicLogout'>;
export type HealthCheckResponse = { healthCheck: string };
