import { Task } from '@project/domain/entity/task.entity';

const TaskRepositorySymbol = Symbol.for('TaskRepository');
export interface ITaskRepository {
  storeTask(entity: Task): Promise<void>;
}
