import {
  FindTokenByAccessTokenArgs,
  FindTokenByRefreshTokenArgs,
  ITokensRepository,
} from '@auth/application/port/out/token-repository.port';
import { Injectable } from '@nestjs/common';
import { TokenMapper } from '@auth/infrastructure/persistence/mapper/token.mapper';
import { Token } from '@auth/domain/entity/token.entity';
import {
  BaseRepository,
  PrismaService,
  TransactionContext,
} from '@libs/database';

@Injectable()
export class TokenRepositoryImpl
  extends BaseRepository
  implements ITokensRepository
{
  async save(entity: Token): Promise<void> {
    const client = this.getPrismaClient();
    const data = TokenMapper.toPersistence(entity);
    await client.tokens.create({
      data,
    });
  }
  async update(entity: Token): Promise<void> {
    const client = this.getPrismaClient();
    const data = TokenMapper.toPersistence(entity);
    await client.tokens.update({
      where: {
        id: entity.id,
      },
      data,
    });
  }
  async findTokenByAccessToken(
    args: FindTokenByAccessTokenArgs,
  ): Promise<Token | null> {
    const client = this.getPrismaClient();
    const record = await client.tokens.findUnique({
      where: {
        accessToken: args.accessToken,
      },
    });
    if (!record) {
      return null;
    }
    return TokenMapper.toDomain(record);
  }
  async findTokenByRefreshToken(
    args: FindTokenByRefreshTokenArgs,
  ): Promise<Token | null> {
    const client = this.getPrismaClient();
    const record = await client.tokens.findUnique({
      where: {
        refreshToken: args.refreshToken,
      },
    });

    if (!record) {
      return null;
    }
    return TokenMapper.toDomain(record);
  }

  async deleteAllRevokeExpiredToken(): Promise<void> {
    const client = this.getPrismaClient();
    const now = new Date();
    await client.tokens.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  }
}
