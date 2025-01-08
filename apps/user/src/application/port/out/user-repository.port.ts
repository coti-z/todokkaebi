import { User } from '@user/domain/entity/user.entity';

export const UserRepositorySymbol = Symbol.for('UserRepository');

export interface DeleteUserArgs {
  id: string;
}

export interface FindUserByIdArgs {
  id: string;
}

// 공통적인 메서드 정의를 위한 기본 인터페이스
export type UserBasicRepositoryArgs = {
  createUser: User;
  updateUser: User;
  deleteUser: DeleteUserArgs;
  findUser: FindUserByIdArgs;
};

export interface IUserRepository {
  createUser(data: User): Promise<void>;
  updateUser(args: User): Promise<void>;
  deleteUser(args: DeleteUserArgs): Promise<void>;
  findUser(args: FindUserByIdArgs): Promise<User | null>;
}
