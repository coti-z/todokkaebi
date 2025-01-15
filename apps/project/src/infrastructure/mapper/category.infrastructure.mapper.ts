import {
  TaskInfraMapper,
  TaskRecord,
} from '@project/infrastructure/mapper/task.infrastructure.mapper';
import { Category } from '@project/domain/entity/category.entity';

export interface CategoryRecord {
  id: string;
  name: string;
  projectId: string;
  tasks: TaskRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryInfraMapper {
  static toPersistence(entity: Category): CategoryRecord {
    const tasks: TaskRecord[] = TaskInfraMapper.tasksToPersistence(
      entity.tasks,
    );
    return {
      id: entity.id,
      name: entity.name,
      tasks: tasks,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  static categoriesToPersistence(entities: Category[]): CategoryRecord[] {
    return entities.map(category => this.toPersistence(category));
  }
}
