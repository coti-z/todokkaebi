import { Task, TaskMutableProps } from '@project/domain/entity/task.entity';

export type StoreTaskParams = Pick<
  Task,
  'title' | 'startDate' | 'endDate' | 'categoryId'
>;

export type QueryTaskByIdParams = Pick<Task, 'id'>;

export type QueryTasksByCategoryIdParams = Pick<Task, 'categoryId'>;

export type UpdateTaskParams = {
  updateDataParams: Partial<TaskMutableProps> & Pick<Task, 'id'>;
};

export type DeleteTaskParams = Pick<Task, 'id'>;
