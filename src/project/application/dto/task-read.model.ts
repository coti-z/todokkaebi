export enum TaskState {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

export class TaskReadModel {
  id: string;

  title: string;

  check: boolean;

  taskStatus: TaskState;

  categoryId: string;

  startDate: Date;

  endDate: Date;

  actualStartDate: Date;

  actualEndDate: Date | undefined;

  createdAt: Date;
  updatedAt: Date;
}
