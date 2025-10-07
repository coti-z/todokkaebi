import { v4 as uuid } from 'uuid';

import { DomainException, ErrorCode } from '@libs/exception';
export interface TokenProps {
  userId: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}
interface TokenPropsFromPersistence {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
  refreshTokenExpiresAt: Date;
}
export class Token {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    private _accessToken: string,
    private _refreshToken: string,
    private _isRevoked: boolean,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _refreshTokenExpiresAt: Date,
  ) {}

  static create(props: TokenProps): Token {
    const now = new Date();
    return new Token(
      uuid(),
      props.userId,
      props.accessToken,
      props.refreshToken,
      false,
      now,
      now,
      props.refreshTokenExpiresAt,
    );
  }

  static fromPersistence(props: TokenPropsFromPersistence): Token {
    return new Token(
      props.id,
      props.userId,
      props.accessToken,
      props.refreshToken,
      props.isRevoked,
      props.createdAt,
      props.updatedAt,
      props.refreshTokenExpiresAt,
    );
  }

  get accessToken() {
    return this._accessToken;
  }
  get refreshToken() {
    return this._refreshToken;
  }
  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get refreshTokenExpiresAt() {
    return this._refreshTokenExpiresAt;
  }

  get isRevoked() {
    return this._isRevoked;
  }

  revokeToken(): void {
    if (this._isRevoked) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
    this._isRevoked = true;
    this._updatedAt = new Date();
  }
  isExpired(): boolean {
    if (this._isRevoked) return true;
    return new Date() > this._refreshTokenExpiresAt;
  }
}
