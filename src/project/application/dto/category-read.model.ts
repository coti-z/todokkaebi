import { TaskReadModel } from '@project/application/dto/task-read.model';

export class CategoryReadModel {
  id: string;
  name: string;

  tasks: TaskReadModel[];

  projectId: string;

  createdAt: Date;
  updatedAt: Date;
}
