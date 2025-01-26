import { Project } from '@project/domain/entity/project.entity';
import { Task } from '@project/domain/entity/task.entity';

export type StoreTaskParams = Pick<
  Task,
  'title' | 'startDate' | 'endDate' | 'categoryId'
> & {
  project: Project;
  reqUserId: string;
};
