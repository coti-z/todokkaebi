import { v4 as uuid } from 'uuid';

import { DomainException, ErrorCode } from '@libs/exception';

export interface CreateUserProps {
  email: string;
  nickname: string;
  hashedPassword: string;
  birthday?: Date;
}
interface ChangeProfileArgs {
  email?: string;
  nickname?: string;
  birthday?: Date;
}

interface UserPersistenceProps {
  id: string;
  email: string;
  nickname: string;
  password: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User domain entity
 *
 * @remarks
 * Encapsulates the core properties and business logic of a user
 *
 * Main responsibility:
 * - Verify domain rules when creating or updating user profile
 * - Manage user credential and profile information
 */
export class User {
  private constructor(
    public readonly id: string,
    private _email: string,
    private _nickname: string,
    private _hashedPassword: string,
    private _createAt: Date,
    private _updateAt: Date,
    private _birthday?: Date,
  ) {
    this.validateEmail(_email);
    this.validateNickname(_nickname);
  }

  // ─────────────────────────────────────
  // Getter
  // ─────────────────────────────────────
  get nickname(): string {
    return this._nickname;
  }

  get birthday(): Date | undefined {
    return this._birthday;
  }

  get createdAt(): Date {
    return this._createAt;
  }

  get updatedAt(): Date {
    return this._updateAt;
  }

  get email(): string {
    return this._email;
  }

  get hashedPassword(): string {
    return this._hashedPassword;
  }

  // ─────────────────────────────────────
  // Factory method
  // ─────────────────────────────────────

  static create(props: CreateUserProps): User {
    const now = new Date();

    return new User(
      uuid(),
      props.email,
      props.nickname,
      props.hashedPassword,
      now,
      now,
      props.birthday,
    );
  }
  static fromPersistence(props: UserPersistenceProps): User {
    return new User(
      props.id,
      props.email,
      props.nickname,
      props.password,
      props.createdAt,
      props.updatedAt,
      props.birthday,
    );
  }
  // ─────────────────────────────────────
  // Method
  // ─────────────────────────────────────

  /**
   * Validate email format
   *
   * @params {string} email - User email address
   * @memberof User
   */
  private validateEmail(email: string): void {
    // 단순 형식 검증이 아닌 비즈니스 규칙
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainException(ErrorCode.INVALID_EMAIL_FORMAT);
    }
  }

  /**
   * Validate nickname constraints
   *
   * @private
   * @param {string} nickname - User nickname
   * @memberof User
   *
   * @remarks
   * Business rules:
   * - Nickname must not be empty or whitespace only
   * - Length must be between 2 and 50 characters
   */
  private validateNickname(nickname: string): void {
    if (!nickname || nickname.trim().length === 0) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
    if (nickname.length < 2 || nickname.length > 50) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
  }

  // ─────────────────────────────────────
  // Method
  // ─────────────────────────────────────

  /**
   * Change user profile information
   *
   * @param {ChangeProfileArgs} args - Profile fields to update
   * @memberof User
   *
   * @remarks
   * - Update only provided fields (partial update)
   * - Automatically updates timestamp
   * - Validates email/nickname if provided
   */
  changeProfile(args: ChangeProfileArgs): void {
    if (args.birthday) this._birthday = args.birthday;
    if (args.nickname) this._nickname = args.nickname;
    if (args.email) this._email = args.email;
    this._updateAt = new Date();
  }
}
