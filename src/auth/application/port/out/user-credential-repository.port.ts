import { UserCredential } from '@auth/domain/entity/user-credential.entity';
import { TransactionContext } from '@libs/database';

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
  createUserCredential(data: UserCredential): Promise<void>;
  updateUserCredential(data: UserCredential): Promise<void>;
  deleteUserCredential(data: DeleteUserCredentialArgs): Promise<void>;
  findUserCredentials(
    data: FindUserCredentialArgs,
  ): Promise<UserCredential | null>;
  findUserCredentialsByEmail(
    data: FindUserCredentialByEmailArgs,
  ): Promise<UserCredential | null>;
}
