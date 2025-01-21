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

export type CreateCategoryRecord = Omit<CategoryRecord, 'tasks'>;

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
  static createToPersistence(entity: Category): CreateCategoryRecord {
    return {
      id: entity.id,
      name: entity.name,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  static categoriesToPersistence(entities: Category[]): CategoryRecord[] {
    return entities.map(category => this.toPersistence(category));
  }

  static categoryToDomain(record: CategoryRecord): Category {
    const tasks = TaskInfraMapper.tasksToDomain(record.tasks);
    return Category.reconstitute({
      id: record.id,
      name: record.name,
      tasks: tasks,
      projectId: record.projectId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static categoriesToDomain(records: CategoryRecord[]): Category[] {
    return records.map(record => this.categoryToDomain(record));
  }
}
