import { Category } from '@project/domain/entity/category.entity';
import { Task } from '@project/domain/entity/task.entity';

export const TaskRepositorySymbol = Symbol.for('TaskRepository');

export interface ITaskRepository {
  storeTask(entity: Task): Promise<void>;

  updateTask(entity: Task): Promise<void>;
  queryTaskByCategoryId(categoryId: string): Promise<Task[]>;
  queryTaskByTaskId(taskId: string): Promise<Task | null>;
}
