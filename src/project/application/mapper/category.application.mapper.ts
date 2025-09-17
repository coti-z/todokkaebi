import { CategoryReadModel } from '@project/application/dto/category-read.model';
import { TaskApplicationMapper } from '@project/application/mapper/task.application.mapper';
import { Category } from '@project/domain/entity/category.entity';

export class CategoryApplicationMapper {
  static entityToCategoryReadModels(entities: Category[]) {
    return entities.map(category => this.entityToCategoryReadModel(category));
  }

  static entityToCategoryReadModel(entity: Category): CategoryReadModel {
    return {
      id: entity.id,
      name: entity.name,
      projectId: entity.projectId,
      tasks: TaskApplicationMapper.tasksToTaskReadModels(entity.tasks),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
