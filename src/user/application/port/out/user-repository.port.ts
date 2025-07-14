import { User } from '@user/domain/entity/user.entity';

export const UserRepositorySymbol = Symbol.for('UserRepository');

export interface DeleteUserArgs {
  id: string;
}

export interface FindUserByIdArgs {
  id: string;
}
export interface IUserRepository {
  createUser(args: User): Promise<void>;
  updateUser(args: User): Promise<void>;
  deleteUser(args: DeleteUserArgs): Promise<void>;
  findUser(args: FindUserByIdArgs): Promise<User | null>;
}
