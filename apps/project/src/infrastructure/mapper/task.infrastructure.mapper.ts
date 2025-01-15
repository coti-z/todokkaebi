import { Task } from '@project/domain/entity/task.entity';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

export enum TaskStateRecord {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}
export interface TaskRecord {
  id: string;
  title: string;
  status: TaskStateRecord;
  check: boolean;
  categoryId: string;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date;
  actualEndDate: Date;
  updatedAt: Date;
  createdAt: Date;
}

export class TaskInfraMapper {
  private static readonly STATE_MAPPING: Record<TaskState, TaskStateRecord> = {
    [TaskState.PENDING]: TaskStateRecord.PENDING,
    [TaskState.IN_PROGRESS]: TaskStateRecord.IN_PROGRESS,
    [TaskState.COMPLETE]: TaskStateRecord.COMPLETE,
  };

  static toPersistence(entity: Task): TaskRecord {
    const mappedState = TaskInfraMapper.STATE_MAPPING[entity.status];
    if (mappedState) {
      throw new Error(`Unknown state ${entity.status}`);
    }

    return {
      id: entity.id,
      title: entity.title,
      status: mappedState,
      check: entity.check,
      categoryId: entity.categoryId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      actualStartDate: entity.actualStartDate,
      actualEndDate: entity.actualEndDate,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }

  static tasksToPersistence(entities: Task[]): TaskRecord[] {
    return entities.map(task => this.toPersistence(task));
  }
}
