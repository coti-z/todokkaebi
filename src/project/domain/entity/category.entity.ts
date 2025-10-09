import { DomainException, ErrorCode } from '@libs/exception';

import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';
import { Task } from './task.entity';

export type CategoryMutableProps = {
  name: string;
  projectId: string;
  tasks: Task[];
};

export type CategoryProps = CategoryMutableProps & BaseEntityProps;

export type CreateCategoryProps = Omit<
  CategoryProps,
  'id' | 'createdAt' | 'updatedAt' | 'tasks'
>;

/**
 * category domain entity
 *
 * @remarks
 * Represents a task grouping within a project.
 * Manage task collection and category naming
 *
 * @extends {BaseEntity<CategoryProps>}
 */
export class Category extends BaseEntity<CategoryProps> {
  private _name: string;
  private _tasks: Task[];
  private _projectId: string;

  private constructor(props: CategoryProps) {
    super(props);
    this._name = props.name;
    this._projectId = props.projectId;
    this._tasks = props.tasks;
  }

  // ─────────────────────────────────────
  // Factory Method
  // ─────────────────────────────────────
  static create(props: CreateCategoryProps): Category {
    const id = this.generateUuid();
    const now = this.generateTimestamp();

    return new Category({
      id: id,
      updatedAt: now,
      createdAt: now,
      name: props.name,
      tasks: [],
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
  get name(): string {
    return this._name;
  }
  get projectId(): string {
    return this._projectId;
  }
  get tasks(): Task[] {
    return this._tasks || [];
  }
  // ─────────────────────────────────────
  // method
  // ─────────────────────────────────────

  /**
   * Change category name
   *
   * @param {string} name
   * @memberof Category
   */
  changeName(name: string): void {
    if (!name) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._name = name;
    this.updateTimestamp();
  }

  /**
   * add task
   *
   * @param {Task} task - task entity
   * @memberof Category
   */
  addTask(task: Task): void {
    if (!task) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._tasks.push(task);
    this.updateTimestamp();
  }

  /**
   * remove task
   *
   * @param {string} taskId - id  of task entity
   * @memberof Category
   */
  removeTask(taskId: string): void {
    if (!taskId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    const index = this._tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this._tasks.splice(index, 1);
      this.updateTimestamp();
    }
  }
}
