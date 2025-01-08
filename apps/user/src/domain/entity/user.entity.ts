import { v4 as uuid } from 'uuid';

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
    private _password: string,
    private _createAt: Date,
    private _updateAt: Date,
    private _birthday?: Date,
  ) {}

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

  get password() {
    return this._password;
  }

  static create(props: UserProps): User {
    const now = new Date();
    return new User(
      uuid(),
      props.email,
      props.nickname,
      props.password,
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

  changeProfile(args: ChangeProfileArgs) {
    if (args.birthday) this._birthday = args.birthday;
    if (args.nickname) this._nickname = args.nickname;
    if (args.email) this._email = args.email;
    this._updateAt = new Date();
  }
}
