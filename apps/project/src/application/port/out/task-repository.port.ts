import { Task } from '@project/domain/entity/task.entity';

export const TaskRepositorySymbol = Symbol.for('TaskRepository');

export interface ITaskRepository {
  storeTask(entity: Task): Promise<void>;
}
