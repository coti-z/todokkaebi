import { Token } from '@auth/domain/entities/token.entity';
import { TransactionContext } from '@libs/database';

export const TokenRepositorySymbol = Symbol.for('TokenRepository');

export interface FindTokenByRefreshTokenArgs {
  refreshToken: string;
}
export interface FindTokenByAccessTokenArgs {
  accessToken: string;
}
export interface ITokensRepository {
  findTokenByRefreshToken(
    args: FindTokenByRefreshTokenArgs,
  ): Promise<Token | null>;
  findTokenByAccessToken(
    args: FindTokenByAccessTokenArgs,
  ): Promise<Token | null>;
  deleteAllRevokeExpiredToken(context?: TransactionContext): Promise<void>;
  update(entity: Token): Promise<void>;
  save(entity: Token): Promise<void>;
}
