import { v4 as uuidv4 } from 'uuid';
export type BaseEntityProps = {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
};

export abstract class BaseEntity<TProps extends BaseEntityProps> {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  protected constructor(props: TProps) {
    this._id = props.id;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected updateTimestamp(): void {
    this._updatedAt = new Date();
  }

  protected static generateUuid(): string {
    return uuidv4();
  }

  protected static generateTimestamp(): Date {
    return new Date();
  }
}
