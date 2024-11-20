import { Prisma } from '@prisma/client';
import { UserModel } from '@src/auth/domain/model/user.model';

export const UserAuthRepositorySymbol = Symbol.for('UserRepository');

// 공통적인 메서드 정의를 위한 기본 인터페이스
export interface IUserRepository {
  findUser: unknown;
}

// Prisma를 사용하는 UserRepository 인터페이스
export type PrismaUserAuthRepositoryArgs = {
  findUser: Prisma.UserFindFirstArgs;
};

// 제너릭을 활용한 유연한 UserRepository 인터페이스
export interface IUserAuthRepositoryGeneric<T extends Record<string, any>> {
  findUser(data: T['findUser']): Promise<UserModel | null>;
}
