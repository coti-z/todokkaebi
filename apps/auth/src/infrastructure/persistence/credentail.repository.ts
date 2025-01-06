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
export class UserCredentialRepository implements IUserCredentialRepository {
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
  async deleteUserCredential(args: DeleteUserCredentialArgs): Promise<void> {
    await this.prisma.userCredentials.delete({
      where: {
        id: args.id,
      },
    });
  }
  async findUserCredentials(
    args: FindUserCredentialArgs,
  ): Promise<UserCredentialEntity | null> {
    const record = await this.prisma.userCredentials.findUnique({
      where: {
        userId: args.userId,
      },
    });
    if (!record) {
      return null;
    }
    return UserCredentialMapper.toDomain(record);
  }

  async findUserCredentialsByEmail(
    args: FindUserCredentialByEmailArgs,
  ): Promise<UserCredentialEntity | null> {
    const record = await this.prisma.userCredentials.findUnique({
      where: {
        email: args.email,
      },
    });
    if (!record) return null;
    return UserCredentialMapper.toDomain(record);
  }
}
