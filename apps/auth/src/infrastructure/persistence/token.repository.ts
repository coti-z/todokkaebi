import {
  FindTokenByAccessTokenArgs,
  FindTokenByRefreshTokenArgs,
  ITokensRepository,
} from '@auth/application/port/out/token-repository.port';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { TokenMapper } from '@auth/infrastructure/persistence/mapper/token.mapper';
import { Token } from '@auth/domain/entities/token.entity';

@Injectable()
export class TokenRepositoryImpl implements ITokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: Token): Promise<void> {
    const data = TokenMapper.toPersistence(entity);
    await this.prisma.tokens.create({
      data,
    });
  }
  async update(entity: Token): Promise<void> {
    const data = TokenMapper.toPersistence(entity);
    await this.prisma.tokens.update({
      where: {
        id: entity.id,
      },
      data,
    });
  }
  async findTokenByAccessToken(
    args: FindTokenByAccessTokenArgs,
  ): Promise<Token | null> {
    const record = await this.prisma.tokens.findUnique({
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
    const record = await this.prisma.tokens.findUnique({
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
    const now = new Date();
    await this.prisma.tokens.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  }
}
