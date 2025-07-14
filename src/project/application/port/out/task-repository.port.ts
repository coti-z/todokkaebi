import { TransactionContext } from '@libs/database/index';
import { Task } from '@project/domain/entity/task.entity';

export const TaskRepositorySymbol = Symbol.for('TaskRepository');

export interface ITaskRepository {
  storeTask(entity: Task): Promise<void>;
  updateTask(entity: Task): Promise<void>;
  deleteTaskById(taskId: string): Promise<void>;
  queryTaskByCategoryId(categoryId: string): Promise<Task[]>;
  queryTaskByTaskId(taskId: string): Promise<Task | null>;
}
