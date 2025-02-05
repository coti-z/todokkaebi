import { Category } from '@project/domain/entity/category.entity';
import { Project } from '@project/domain/entity/project.entity';
import { Task, TaskMutableProps } from '@project/domain/entity/task.entity';

export type StoreTaskParams = Pick<
  Task,
  'title' | 'startDate' | 'endDate' | 'categoryId'
> & {
  project: Project;
  reqUserId: string;
};

export type QueryTaskByIdParams = Pick<Task, 'id'> & {
  project: Project;
  reqUserId: string;
};

export type QueryTasksByCategoryIdParams = Pick<Task, 'categoryId'> & {
  project: Project;
  reqUserId: string;
};

export type UpdateTaskParams = {
  updateDataParams: Partial<TaskMutableProps> & Pick<Task, 'id'>;
  project: Project;
  reqUserId: string;
};

export type DeleteTaskParams = Pick<Task, 'id'> & {
  project: Project;
  reqUserId: string;
};
