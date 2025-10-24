import { v4 as uuid } from 'uuid';

import { DomainException, ErrorCode } from '@libs/exception';

import { Email } from '@user/domain/value-object/email.vo';
import { Nickname } from '@user/domain/value-object/nickname.vol';

import {
  BaseEntity,
  BaseEntityProps,
} from '@project/domain/entity/abstract/base-entity.abstract.entity';

export type CreateUserProps = {
  email: Email;
  nickname: Nickname;
  hashedPassword: string;
  birthday?: Date;
};

export type UserProps = CreateUserProps & BaseEntityProps;
export type PersistenceUserProps = Pick<
  UserProps,
  'id' | 'birthday' | 'createdAt' | 'hashedPassword' | 'updatedAt'
> & {
  email: string;
  nickname: string;
};

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
export class User extends BaseEntity<UserProps> {
  private _email: Email;
  private _nickname: Nickname;
  private _hashedPassword: string;
  private _birthday?: Date;
  private constructor(props: UserProps) {
    super(props);
    this._email = props.email;
    this._nickname = props.nickname;
    this._hashedPassword = props.hashedPassword;
  }

  // ─────────────────────────────────────
  // Getter
  // ─────────────────────────────────────
  get nickname(): Nickname {
    return this._nickname;
  }

  get birthday(): Date | undefined {
    return this._birthday;
  }

  get email(): Email {
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
    const id = uuid();
    return new User({
      id: id,
      createdAt: now,
      email: props.email,
      hashedPassword: props.hashedPassword,
      nickname: props.nickname,
      updatedAt: now,
    });
  }
  static fromPersistence(props: PersistenceUserProps): User {
    const emailVo = Email.create({
      email: props.email,
    });
    const nicknameVo = Nickname.create({
      nickname: props.nickname,
    });
    return new User({
      id: props.id,
      email: emailVo,
      nickname: nicknameVo,
      hashedPassword: props.hashedPassword,
      birthday: props.birthday,
      updatedAt: props.updatedAt,
      createdAt: props.createdAt,
    });
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

  changeEmail(email: Email): void {
    this._email = email;
  }

  changeNickname(nickname: Nickname): void {
    this._nickname = nickname;
  }

  changeBirthday(birthday: Date): void {
    this._birthday = birthday;
  }
  changePassword(hashedPassword: string): void {
    this._hashedPassword = hashedPassword;
  }
}
