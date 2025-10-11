import { Task } from '@project/domain/entity/task.entity';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

export type TaskStateRecord = 'PENDING' | 'IN_PROGRESS' | 'COMPLETE';

export interface TaskRecord {
  id: string;
  title: string;
  taskStatus: any;
  check: boolean;
  categoryId: string;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date | null;
  actualEndDate: Date | null;
  updatedAt: Date;
  createdAt: Date;
}

export class TaskInfraMapper {
  private static readonly STATE_MAPPING: Record<TaskState, TaskStateRecord> = {
    [TaskState.PENDING]: 'PENDING',
    [TaskState.IN_PROGRESS]: 'IN_PROGRESS',
    [TaskState.COMPLETE]: 'COMPLETE',
  };
  private static readonly STATE_MAPPING_TO_DOMAIN: Record<
    TaskStateRecord,
    TaskState
  > = {
    PENDING: TaskState.PENDING,
    IN_PROGRESS: TaskState.IN_PROGRESS,
    COMPLETE: TaskState.COMPLETE,
  };

  static toPersistence(entity: Task): TaskRecord {
    const mappedState = TaskInfraMapper.STATE_MAPPING[entity.taskStatus];
    if (!mappedState) {
      throw new Error(`Unknown state ${entity.taskStatus}`);
    }

    return {
      id: entity.id,
      title: entity.title,
      taskStatus: mappedState,
      check: entity.check,
      categoryId: entity.categoryId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      actualStartDate: entity.actualStartDate || null,
      actualEndDate: entity.actualEndDate || null,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }

  static tasksToPersistence(entities: Task[]): TaskRecord[] {
    return entities.map(task => this.toPersistence(task));
  }

  static taskToDomain(record: TaskRecord): Task {
    const getStatus = record.taskStatus as unknown as TaskState;
    const mappedState = TaskInfraMapper.STATE_MAPPING_TO_DOMAIN[getStatus];
    if (!mappedState) {
      throw new Error(`Unknown state ${record.taskStatus}`);
    }

    return Task.reconstitute({
      id: record.id,
      title: record.title,
      taskStatus: mappedState,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      actualEndDate: record.actualEndDate || undefined,
      actualStartDate: record.actualStartDate || undefined,
      categoryId: record.categoryId,
      startDate: record.startDate,
      endDate: record.endDate,
      check: record.check,
    });
  }

  static tasksToDomain(tasks: TaskRecord[]): Task[] {
    return tasks.map(task => this.taskToDomain(task));
  }
}
