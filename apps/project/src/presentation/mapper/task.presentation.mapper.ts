import { Task } from '@project/domain/entity/task.entity';
import { TaskType } from '@project/presentation/resolver/type/task.type';

export class TaskPresentationMapper {
  static entityToObjectType(entity: Task): TaskType {
    return {
      actualEndDate: entity.actualEndDate,
      actualStartDate: entity.actualStartDate,
      categoryId: entity.categoryId,
      check: entity.check,
      endDate: entity.endDate,
      createdAt: entity.createdAt,
      startDate: entity.startDate,
      status: entity.status,
      title: entity.title,
      updateAt: entity.updatedAt,
      id: entity.id,
    };
  }

  static entitiesToObjectType(entities: Task[]): TaskType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }
}
