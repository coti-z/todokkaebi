import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { UserCredentialEntity } from '@auth/domain/entities/credential.entity';
import {
  DeleteUserCredentialArgs,
  FindUserCredentialArgs,
  FindUserCredentialByEmailArgs,
  IUserCredentialRepository,
} from '@auth/application/port/out/user-credential-repository.port';
import { UserCredentialMapper } from '@auth/infrastructure/persistence/mapper/user-credential.mapper';

@Injectable()
export class UserCredentialRepositoryImpl implements IUserCredentialRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createUserCredential(entity: UserCredentialEntity): Promise<void> {
    const data = UserCredentialMapper.toPersistence(entity);
    await this.prisma.userCredentials.create({ data });
  }
  async updateUserCredential(entity: UserCredentialEntity): Promise<void> {
    const record = UserCredentialMapper.toPersistence(entity);

    await this.prisma.userCredentials.update({
      where: {
        id: entity.id,
      },
      data: record,
    });
  }
  async deleteUserCredential(data: DeleteUserCredentialArgs): Promise<void> {
    await this.prisma.userCredentials.delete({
      where: {
        id: data.id,
      },
    });
  }
  async findUserCredentials(
    data: FindUserCredentialArgs,
  ): Promise<UserCredentialEntity | null> {
    const record = await this.prisma.userCredentials.findUnique({
      where: {
        userId: data.userId,
      },
    });
    if (!record) {
      return null;
    }
    return UserCredentialMapper.toDomain(record);
  }

  async findUserCredentialsByEmail(
    data: FindUserCredentialByEmailArgs,
  ): Promise<UserCredentialEntity | null> {
    const record = await this.prisma.userCredentials.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!record) return null;
    return UserCredentialMapper.toDomain(record);
  }
}
