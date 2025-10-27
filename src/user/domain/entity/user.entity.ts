import { v4 as uuid } from 'uuid';

import { DomainEvent } from '@libs/event/domain-event.abstract';

import { CreateUserEvent } from '@user/domain/event/create-user.event';
import { DeleteUserEvent } from '@user/domain/event/delete-user.event';
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
  private domainEvents: DomainEvent[] = [];
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
    const user = new User({
      id: id,
      createdAt: now,
      email: props.email,
      hashedPassword: props.hashedPassword,
      nickname: props.nickname,
      updatedAt: now,
    });

    user.addDomainEvent(
      new CreateUserEvent(id, props.email.getValue(), props.hashedPassword),
    );

    return user;
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
  delete(): void {
    this.addDomainEvent(new DeleteUserEvent(this.id));
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

  // ─────────────────────────────────────
  // Domain Event Methods
  // ─────────────────────────────────────

  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  cleanDomainEvents(): void {
    this.domainEvents = [];
  }
}
