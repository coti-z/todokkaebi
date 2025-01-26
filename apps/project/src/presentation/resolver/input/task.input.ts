import { TaskType } from '../type/task.type';

export type CreateTaskInput = Pick<
  TaskType,
  'categoryId' | 'startDate' | 'endDate' | 'title'
>;
