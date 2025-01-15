import { Task } from './task.entity';

import { v4 as uuidv4 } from 'uuid';

interface CategoryProps {
  name: string;
  projectId: string;
  tasks?: Task[];
}
export class Category {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _projectId: string,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _tasks?: Task[],
  ) {}

  get name(): string {
    return this._name;
  }
  get projectId(): string {
    return this._projectId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get tasks(): Task[] {
    return this._tasks ? this._tasks : [];
  }

  static create(props: CategoryProps): Category {
    const id = uuidv4();
    const now = new Date();
    return new Category(id, props.name, props.projectId, now, now, props.tasks);
  }
}
