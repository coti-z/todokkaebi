import { MutationResponse } from 'test/types/common.types';

export interface UserData {
  id: string;
  email: string;
  nickname: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserIdData = { userId: Pick<UserData, 'id'>['id'] };

export type CreateUserResponse = MutationResponse<UserData, 'createUser'>;
export type UpdateUserResponse = MutationResponse<UserIdData, 'updateUser'>;
export type DeleteUserResponse = MutationResponse<UserIdData, 'deleteUser'>;
export type HealthCheckResponse = { healthCheck: string };
