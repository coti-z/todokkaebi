import { v4 as uuid } from 'uuid';
interface UserCredentialProps {
  userId: string;
  email: string;
  passwordHash: string;
}
interface UserCredentialPersistenceProps {
  id: string;
  userId: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
export class UserCredentialEntity {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    private _email: string,
    private _passwordHash: string,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  static create(props: UserCredentialProps): UserCredentialEntity {
    const now = new Date();
    return new UserCredentialEntity(
      uuid(),
      props.userId,
      props.email,
      props.passwordHash,
      now,
      now,
    );
  }
  static fromPersistence(
    props: UserCredentialPersistenceProps,
  ): UserCredentialEntity {
    return new UserCredentialEntity(
      props.id,
      props.userId,
      props.email,
      props.passwordHash,
      props.createdAt,
      props.updatedAt,
    );
  }

  get email() {
    return this._email;
  }

  get passwordHash() {
    return this._passwordHash;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
