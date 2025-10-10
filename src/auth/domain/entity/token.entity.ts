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
/**
 * Token domain entity
 *
 * @remarks
 * Encapsulates JWT token lifecycle and validation logic
 *
 * Main responsibility:
 * - Manage access token and refresh token pairs
 * - Track token revocation status
 * - Validate token expiration
 */
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

  // ─────────────────────────────────────
  // Factory Method
  // ─────────────────────────────────────

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

  // ─────────────────────────────────────
  // Getter
  // ─────────────────────────────────────
  get accessToken(): string {
    return this._accessToken;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get refreshTokenExpiresAt(): Date {
    return this._refreshTokenExpiresAt;
  }

  get isRevoked(): boolean {
    return this._isRevoked;
  }

  // ─────────────────────────────────────
  // Method
  // ─────────────────────────────────────

  /**
   * Revoke token to invalidate it
   *
   * @memberof Token
   *
   * @remarks
   * Used when user logs out or token needs to be invalidated
   * - Updates revocation status and timestamp
   * - Prevents double revocation
   */
  revokeToken(): void {
    if (this._isRevoked) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
    this._isRevoked = true;
    this._updatedAt = new Date();
  }

  /**
   * Check if token is expired or revoked
   *
   * @remarks
   * Token is considered expired when:
   * - Token is explicitly revoked
   * - Current time exceeds refresh token expiration time
   */
  isExpired(): boolean {
    if (this._isRevoked) return true;
    return new Date() > this._refreshTokenExpiresAt;
  }
}
