import { UserCredentialEntity } from '@auth/domain/entities/credential.entity';

export interface FindUserCredentialArgs {
  userId: string;
}

export interface DeleteUserCredentialArgs {
  id: string;
}
export interface FindUserCredentialByEmailArgs {
  email: string;
}

export const UserCredentialRepositorySymbol = Symbol.for(
  'UserCredentialRepository',
);

export interface IUserCredentialRepository {
  createUserCredential(entity: UserCredentialEntity): Promise<void>;
  updateUserCredential(entity: UserCredentialEntity): Promise<void>;
  deleteUserCredential(data: DeleteUserCredentialArgs): Promise<void>;
  findUserCredentials(
    data: FindUserCredentialArgs,
  ): Promise<UserCredentialEntity | null>;
  findUserCredentialsByEmail(
    data: FindUserCredentialByEmailArgs,
  ): Promise<UserCredentialEntity | null>;
}
