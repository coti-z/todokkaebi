import { v4 as uuid } from 'uuid';

export interface UserCredentialProps {
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
/**
 * User credential entity
 *
 * @remarks
 * Encapsulates user authentication credential separate from user profile
 *
 * Main responsibility:
 * - Manage email and password hash for authentication
 * - Separate security-sensitive data from user profile
 */
export class UserCredential {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    private _email: string,
    private _passwordHash: string,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}
  // ─────────────────────────────────────
  // Getter
  // ─────────────────────────────────────

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  // ─────────────────────────────────────
  // Factory method
  // ─────────────────────────────────────

  static create(props: UserCredentialProps): UserCredential {
    const now = new Date();
    return new UserCredential(
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
  ): UserCredential {
    return new UserCredential(
      props.id,
      props.userId,
      props.email,
      props.passwordHash,
      props.createdAt,
      props.updatedAt,
    );
  }
}
