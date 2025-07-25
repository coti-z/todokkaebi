import { Injectable } from '@nestjs/common';
import {
  DeleteUserArgs,
  FindUserByEmailArgs,
  FindUserByIdArgs,
  IUserRepository,
} from '@user/application/port/out/user-repository.port';
import { UserMapper } from '@user/infrastructure/mapper/user.mapper';
import { User } from '@user/domain/entity/user.entity';
import { BaseRepository } from '@libs/database';

/**
 * 유저 리포지토리 구현체
 * Prisma를 사용한 유저 데이터 CRUD 처리
 */
@Injectable()
export class UserRepositoryImpl
  extends BaseRepository
  implements IUserRepository
{
  /**
   * 새로운 유저 생성
   * @param args 생성할 유저 도메인 객체
   */
  async createUser(args: User): Promise<void> {
    const client = this.getPrismaClient();
    // 도메인 객체를 DB용 객체로 변환
    const data = UserMapper.toPersistence(args);
    await client.users.create({ data });
  }

  /**
   * 기존 유저 정보 업데이트
   * @param args 업데이트할 유저 도메인 객체
   */
  async updateUser(args: User): Promise<void> {
    const client = this.getPrismaClient();
    const data = UserMapper.toPersistence(args);
    await client.users.update({
      where: { id: args.id },
      data,
    });
  }

  /**
   * 유저 삭제
   * @param args 삭제할 유저 ID 정보
   */
  async deleteUser(args: DeleteUserArgs): Promise<void> {
    const client = this.getPrismaClient();
    await client.users.delete({
      where: { id: args.id },
    });
  }

  /**
   * ID로 유저 조회
   * @param args 조회할 유저 ID 정보
   * @returns 찾은 유저 도메인 객체 또는 null
   */
  async findUserById(args: FindUserByIdArgs): Promise<User | null> {
    const client = this.getPrismaClient();
    const user = await client.users.findUnique({ where: { id: args.id } });

    // 유저가 없으면 null 반환
    if (!user) {
      return null;
    }

    // DB 객체를 도메인 객체로 변환해서 반환
    return UserMapper.toDomain({
      id: user.id,
      email: user.email,
      birthday: user.birthday ?? undefined,
      password: user.password,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  }

  /**
   * EMAIL로 유저 조회
   * @param args 조회할 유저 EMAIL 정보
   * @returns 찾은 유저 도메인 객체 또는 null
   */
  async findUserByEmail(args: FindUserByEmailArgs): Promise<User | null> {
    const client = this.getPrismaClient();
    const user = await client.users.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain({
      id: user.id,
      email: user.email,
      birthday: user.birthday ?? undefined,
      password: user.password,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  }
}
