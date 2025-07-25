import { Injectable } from '@nestjs/common';
import {
  DeleteUserCredentialArgs,
  FindUserCredentialArgs,
  FindUserCredentialByEmailArgs,
  IUserCredentialRepository,
} from '@auth/application/port/out/user-credential-repository.port';
import { UserCredentialMapper } from '@auth/infrastructure/persistence/mapper/user-credential.mapper';
import { UserCredential } from '@auth/domain/entity/user-credential.entity';
import {
  BaseRepository,
  PrismaService,
  TransactionContext,
} from '@libs/database';

@Injectable()
export class UserCredentialRepositoryImpl
  extends BaseRepository
  implements IUserCredentialRepository
{
  async createUserCredential(entity: UserCredential): Promise<void> {
    const client = this.getPrismaClient();
    const data = UserCredentialMapper.toPersistence(entity);
    await client.userCredentials.create({ data });
  }
  async updateUserCredential(entity: UserCredential): Promise<void> {
    const client = this.getPrismaClient();
    const record = UserCredentialMapper.toPersistence(entity);
    await client.userCredentials.update({
      where: {
        id: entity.id,
      },
      data: record,
    });
  }
  async deleteUserCredential(data: DeleteUserCredentialArgs): Promise<void> {
    const client = this.getPrismaClient();
    await client.userCredentials.delete({
      where: {
        id: data.id,
      },
    });
  }
  async findUserCredentials(
    data: FindUserCredentialArgs,
  ): Promise<UserCredential | null> {
    const client = this.getPrismaClient();
    const record = await client.userCredentials.findUnique({
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
  ): Promise<UserCredential | null> {
    const client = this.getPrismaClient();
    const record = await client.userCredentials.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!record) return null;
    return UserCredentialMapper.toDomain(record);
  }
}
