import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { DomainException, ErrorCode } from '@libs/exception';

interface UserProps {
  email: string;
  nickname: string;
  password: string;
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

  get nickname() {
    return this._nickname;
  }

  get birthday() {
    return this._birthday;
  }

  get createdAt() {
    return this._createAt;
  }

  get updatedAt() {
    return this._updateAt;
  }

  get email() {
    return this._email;
  }

  get hashedPassword() {
    return this._hashedPassword;
  }

  static async create(props: UserProps): Promise<User> {
    const now = new Date();
    this.validatePassword(props.password);

    const hashedPassword = await bcrypt.hash(props.password, 12);

    return new User(
      uuid(),
      props.email,
      props.nickname,
      hashedPassword,
      now,
      now,
      props.birthday,
    );
  }

  private validateEmail(email: string): void {
    // 단순 형식 검증이 아닌 비즈니스 규칙
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainException(ErrorCode.INVALID_EMAIL_FORMAT);
    }
  }

  private validateNickname(nickname: string): void {
    if (!nickname || nickname.trim().length === 0) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
    if (nickname.length < 2 || nickname.length > 50) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
  }

  private static validatePassword(password: string): void {
    if (password.length < 4) {
      throw new DomainException(ErrorCode.INVALID_PASSWORD_FORMAT);
    }
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

  changeProfile(args: ChangeProfileArgs) {
    if (args.birthday) this._birthday = args.birthday;
    if (args.nickname) this._nickname = args.nickname;
    if (args.email) this._email = args.email;
    this._updateAt = new Date();
  }
}
