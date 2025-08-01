import { Token } from '@auth/domain/entity/token.entity';

interface TokenRecord {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
  refreshTokenExpiresAt: Date;
}
export class TokenMapper {
  static toPersistence(entity: Token): TokenRecord {
    return {
      id: entity.id,
      userId: entity.userId,
      refreshTokenExpiresAt: entity.refreshTokenExpiresAt,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      refreshToken: entity.refreshToken,
      isRevoked: entity.isRevoked,
      accessToken: entity.accessToken,
    };
  }

  static toDomain(record: TokenRecord): Token {
    return Token.fromPersistence({
      id: record.id,
      userId: record.userId,
      refreshTokenExpiresAt: record.refreshTokenExpiresAt,
      updatedAt: record.updatedAt,
      createdAt: record.createdAt,
      refreshToken: record.refreshToken,
      isRevoked: record.isRevoked,
      accessToken: record.accessToken,
    });
  }
}
