import { Injectable } from '@nestjs/common';
import {
  IUserAuthRepositoryGeneric,
  PrismaUserAuthRepositoryArgs,
} from '@src/auth/domain/interface/user-repository.interface';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserMapper } from '@src/auth/domain/mapper/user.mapper';
import { UserModel } from '@src/user/domain/model/user.model';

@Injectable()
export class UserAuthRepository
  implements IUserAuthRepositoryGeneric<PrismaUserAuthRepositoryArgs>
{
  constructor(private readonly prisma: PrismaService) {}

  async findUser(data: Prisma.UserFindFirstArgs): Promise<UserModel | null> {
    const user = await this.prisma.user.findFirst(data);
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }
}
