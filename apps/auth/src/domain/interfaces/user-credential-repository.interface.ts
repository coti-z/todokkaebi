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

export interface IUserCredentialRepository {
  createUserCredential(entity: UserCredentialEntity): Promise<void>;
  updateUserCredential(entity: UserCredentialEntity): Promise<void>;
  deleteUserCredential(args: DeleteUserCredentialArgs): Promise<void>;
  findUserCredentials(
    args: FindUserCredentialArgs,
  ): Promise<UserCredentialEntity | null>;
  findUserCredentialsByEmail(
    args: FindUserCredentialByEmailArgs,
  ): Promise<UserCredentialEntity | null>;
}
