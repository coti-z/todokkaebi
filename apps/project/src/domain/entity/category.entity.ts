import { Task } from './task.entity';

import { v4 as uuidv4 } from 'uuid';
import { ErrorCode, errorFactory } from '@libs/exception';

export type CategoryMutableProps = {
  name: string;
  projectId: string;
  updatedAt: Date;
  tasks?: Task[];
};
export type CategoryImmutableProps = {
  readonly id: string;
  readonly createdAt: Date;
};

export type CategoryProps = CategoryImmutableProps & CategoryMutableProps;
type CreateCategoryProps = Omit<
  CategoryProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export class Category {
  private constructor(private readonly props: CategoryProps) {}

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get projectId(): string {
    return this.props.projectId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get tasks(): Task[] {
    return this.props.tasks || [];
  }

  static create(props: CreateCategoryProps): Category {
    const id = uuidv4();
    const now = new Date();
    return new Category({
      id: id,
      updatedAt: now,
      createdAt: now,
      name: props.name,
      tasks: props.tasks,
      projectId: props.projectId,
    });
  }

  static reconstitute(props: CategoryProps): Category {
    return new Category({
      id: props.id,
      tasks: props.tasks,
      projectId: props.projectId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      name: props.name,
    });
  }

  changeName(name: string) {
    if (!name) {
      throw errorFactory(ErrorCode.BAD_REQUEST);
    }
    this.props.name = name;
  }
}
