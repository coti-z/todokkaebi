import { Category } from '@project/domain/entity/category.entity';
import { CategoryType } from '@project/presentation/resolver/type/category.type';
import { TaskPresentationMapper } from '@project/presentation/mapper/task.presentation.mapper';
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  QueryCategoryByIdInput,
  UpdateCategoryInput,
} from '@project/presentation/resolver/input/category.input';
import { CreateCategoryCommand } from '@project/application/command/category/create-category.command';
import {
  CreateCategoryOutput,
  DeleteCategoryOutput,
  QueryCategoryByIdOutput,
  UpdateCategoryOutput,
} from '@project/presentation/resolver/output/category.output';
import { DeleteCategoryCommand } from '@project/application/command/category/delete-category.command';
import { UpdateCategoryCommand } from '@project/application/command/category/update-category.command';
import { CategoryByIdQuery } from '@project/application/query/category-by-id.query';

export class CategoryPresentationMapper {
  static createCategoryInputToCreateCategoryCommand(
    input: CreateCategoryInput,
  ): CreateCategoryCommand {
    return new CreateCategoryCommand(input.projectId, input.name);
  }
  static deleteCategoryInputToDeleteCategoryCommand(
    input: DeleteCategoryInput,
    userId: string,
  ): DeleteCategoryCommand {
    return new DeleteCategoryCommand(input.id, userId);
  }

  static updateCategoryInputToUpdateCategoryCommand(
    input: UpdateCategoryInput,
    userId: string,
  ): UpdateCategoryCommand {
    return new UpdateCategoryCommand(
      userId,
      input.name,
      input.id,
      input.projectId,
    );
  }

  static queryCategoryByIdInputToQueryCategory(
    input: QueryCategoryByIdInput,
    userId: string,
  ): CategoryByIdQuery {
    return new CategoryByIdQuery(userId, input.id);
  }

  // entity to ObjectType
  static entityToObjectType(entity: Category): CategoryType {
    const tasksType = TaskPresentationMapper.entitiesToObjectType(entity.tasks);
    return {
      createdAt: entity.createdAt,
      name: entity.name,
      tasks: tasksType,
      projectId: entity.projectId,
      updatedAt: entity.updatedAt,
      id: entity.id,
    };
  }

  static entitiesToObjectType(entities: Category[]): CategoryType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }
  static entityToCreateCategoryOutput(entity: Category): CreateCategoryOutput {
    return {
      name: entity.name,
      projectId: entity.projectId,
      updatedAt: entity.updatedAt,
      id: entity.id,
      createdAt: entity.createdAt,
    };
  }
  static entityToDeleteCategoryOutput(entity: Category): DeleteCategoryOutput {
    return {
      id: entity.id,
    };
  }

  static entityToUpdateCategoryOutput(entity: Category): UpdateCategoryOutput {
    return {
      id: entity.id,
      updatedAt: entity.updatedAt,
      tasks: TaskPresentationMapper.entitiesToObjectType(entity.tasks),
      name: entity.name,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
    };
  }

  static entityToQueryCategoryByIdOutput(
    entity: Category,
  ): QueryCategoryByIdOutput {
    return {
      createdAt: entity.createdAt,
      id: entity.id,
      name: entity.name,
      projectId: entity.id,
      tasks: TaskPresentationMapper.entitiesToObjectType(entity.tasks),
      updatedAt: entity.updatedAt,
    };
  }
}
