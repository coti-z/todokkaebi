import { DomainException } from '@libs/exception';
import { ErrorCode } from '@libs/exception';
import { v4 as uuid } from 'uuid';
interface TokenProps {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}
interface TokenPropsFromPersistence {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
export class Token {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private _accessToken: string,
    private _refreshToken: string,
    private _isRevoked: boolean,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _expiresAt: Date,
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
      props.expiresAt,
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
      props.expiresAt,
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

  get expiresAt() {
    return this._expiresAt;
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
    return new Date() > this._expiresAt;
  }
}
