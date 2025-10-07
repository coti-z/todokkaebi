import { RequestContext } from '@libs/exception';

import { CategoryReadModel } from '@project/application/dto/category-read.model';
import { ChangeCategoryNameCommand } from '@project/application/port/in/command/category/change-category-name.command';
import { CreateCategoryCommand } from '@project/application/port/in/command/category/create-category.command';
import { DeleteCategoryCommand } from '@project/application/port/in/command/category/delete-category.command';
import { CategoryByIdQuery } from '@project/application/port/in/query/category/category-by-id.query';
import { TaskPresentationMapper } from '@project/presentation/mapper/task.presentation.mapper';
import {
  ChangeCategoryNameInput,
  CreateCategoryInput,
  DeleteCategoryInput,
  QueryCategoryByIdInput,
} from '@project/presentation/resolver/input/category.input';
import {
  ChangeCategoryNameOutput,
  CreateCategoryOutput,
  DeleteCategoryOutput,
  QueryCategoryByIdOutput,
} from '@project/presentation/resolver/output/category.output';
import { CategoryType } from '@project/presentation/resolver/type/category.type';

export class CategoryPresentationMapper {
  static createCategoryInputToCreateCategoryCommand(
    input: CreateCategoryInput,
    userId: string,
    context: RequestContext,
  ): CreateCategoryCommand {
    return new CreateCategoryCommand(
      input.projectId,
      input.name,
      userId,
      context,
    );
  }
  static deleteCategoryInputToDeleteCategoryCommand(
    input: DeleteCategoryInput,
    userId: string,
    context: RequestContext,
  ): DeleteCategoryCommand {
    return new DeleteCategoryCommand(input.categoryId, userId, context);
  }

  static changeCategoryNameInputToUpdateCategoryCommand(
    input: ChangeCategoryNameInput,
    userId: string,
    context: RequestContext,
  ): ChangeCategoryNameCommand {
    return new ChangeCategoryNameCommand(
      userId,
      input.name,
      input.categoryId,
      context,
    );
  }

  static queryCategoryByIdInputToQueryCategory(
    input: QueryCategoryByIdInput,
    userId: string,
    context: RequestContext,
  ): CategoryByIdQuery {
    return new CategoryByIdQuery(userId, input.categoryId, context);
  }

  // readModel to ObjectType
  static readModelToObjectType(readModel: CategoryReadModel): CategoryType {
    const tasksType = TaskPresentationMapper.readModelsToObjectType(
      readModel.tasks,
    );
    return {
      createdAt: readModel.createdAt,
      name: readModel.name,
      tasks: tasksType,
      projectId: readModel.projectId,
      updatedAt: readModel.updatedAt,
      id: readModel.id,
    };
  }

  static readModelsToObjectType(
    readModels: CategoryReadModel[],
  ): CategoryType[] {
    if (!readModels) return [];
    return readModels.map(readModel => this.readModelToObjectType(readModel));
  }
  static readModelToCreateCategoryOutput(
    readModel: CategoryReadModel,
  ): CreateCategoryOutput {
    return this.readModelToObjectType(readModel);
  }
  static readModelToDeleteCategoryOutput(
    readModel: CategoryReadModel,
  ): DeleteCategoryOutput {
    return {
      id: readModel.id,
    };
  }

  static readModelToUpdateCategoryOutput(
    readModel: CategoryReadModel,
  ): ChangeCategoryNameOutput {
    return {
      id: readModel.id,
      updatedAt: readModel.updatedAt,
      tasks: TaskPresentationMapper.readModelsToObjectType(readModel.tasks),
      name: readModel.name,
      projectId: readModel.projectId,
      createdAt: readModel.createdAt,
    };
  }

  static readModelToQueryCategoryByIdOutput(
    readModel: CategoryReadModel,
  ): QueryCategoryByIdOutput {
    return {
      createdAt: readModel.createdAt,
      id: readModel.id,
      name: readModel.name,
      projectId: readModel.projectId,
      tasks: TaskPresentationMapper.readModelsToObjectType(readModel.tasks),
      updatedAt: readModel.updatedAt,
    };
  }
}
