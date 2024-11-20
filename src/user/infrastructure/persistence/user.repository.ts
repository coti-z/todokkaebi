import { Injectable } from '@nestjs/common';
import {
  IUserRepositoryGeneric,
  PrismaUserRepositoryArgs,
} from '@src/user/domain/interface/user-repository.interface';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserModel } from '@src/auth/domain/model/user.model';
import { UserMapper } from '@src/user/domain/mapper/user.mapper';

@Injectable()
export class PrismaUserRepositoryImpl
  implements IUserRepositoryGeneric<PrismaUserRepositoryArgs>
{
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateArgs): Promise<UserModel> {
    const user = await this.prisma.user.create(data);
    return UserMapper.fromPrismaToDomain(user);
  }

  async updateUser(data: Prisma.UserUpdateArgs): Promise<UserModel> {
    const user = await this.prisma.user.update(data);
    return UserMapper.fromPrismaToDomain(user);
  }

  async deleteUser(data: Prisma.UserDeleteArgs): Promise<UserModel> {
    const user = await this.prisma.user.delete(data);
    return UserMapper.fromPrismaToDomain(user);
  }

  async findUser(data: Prisma.UserFindUniqueArgs): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique(data);
    if (!user) {
      return null;
    }
    return UserMapper.fromPrismaToDomain(user);
  }
}
