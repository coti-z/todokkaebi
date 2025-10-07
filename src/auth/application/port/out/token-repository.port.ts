import { TransactionContext } from '@libs/database';

import { Token } from '@auth/domain/entity/token.entity';

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
