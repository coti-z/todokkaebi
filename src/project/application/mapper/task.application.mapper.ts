import { TaskReadModel } from '@project/application/dto/task-read.model';
import { Task } from '@project/domain/entity/task.entity';

export class TaskApplicationMapper {
  static tasksToTaskReadModels(entities: Task[]): TaskReadModel[] {
    return entities.map(task => this.entityToTaskReadModel(task));
  }
  static entityToTaskReadModel(entity: Task): TaskReadModel {
    return {
      actualEndDate: entity.actualEndDate,
      actualStartDate: entity.actualStartDate,
      check: entity.check,
      createdAt: entity.createdAt,
      categoryId: entity.categoryId,
      endDate: entity.endDate,
      id: entity.id,
      startDate: entity.startDate,
      taskStatus: entity.taskStatus,
      title: entity.title,
      updatedAt: entity.updatedAt,
    };
  }
}
