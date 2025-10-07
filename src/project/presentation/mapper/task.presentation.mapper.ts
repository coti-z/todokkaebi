import { RequestContext } from '@libs/exception';

import { TaskReadModel } from '@project/application/dto/task-read.model';
import { CreateTaskCommand } from '@project/application/port/in/command/task/create-task.command';
import { DeleteTaskCommand } from '@project/application/port/in/command/task/delete-task.command';
import { UpdateTaskCommand } from '@project/application/port/in/command/task/update-task.command';
import { TasksByCategoryIdQuery } from '@project/application/port/in/query/task/task-by-categoryid.query';
import { TaskByIdQuery } from '@project/application/port/in/query/task/task-by-id.query';
import {
  CreateTaskInput,
  DeleteTaskInput,
  QueryTaskByIdInput,
  QueryTasksByCategoryIdInput,
  UpdateTaskInput,
} from '@project/presentation/resolver/input/task.input';
import {
  CreateTaskOutput,
  DeleteTaskOutput,
  QueryTaskByCategoryIdOutput,
  QueryTaskByIdOutput,
  UpdateTaskOutput,
} from '@project/presentation/resolver/output/task.output';
import { TaskType } from '@project/presentation/resolver/type/task.type';

export class TaskPresentationMapper {
  static readModelToObjectType(readModel: TaskReadModel): TaskType {
    return {
      actualEndDate: readModel.actualEndDate,
      actualStartDate: readModel.actualStartDate,
      categoryId: readModel.categoryId,
      check: readModel.check,
      title: readModel.title,
      id: readModel.id,
      taskStatus: readModel.taskStatus,
      endDate: new Date(readModel.endDate),
      createdAt: new Date(readModel.createdAt),
      startDate: new Date(readModel.startDate),
      updatedAt: new Date(readModel.updatedAt),
    };
  }

  static readModelsToObjectType(readModels: TaskReadModel[]): TaskType[] {
    if (!readModels) return [];
    return readModels.map(readModel => this.readModelToObjectType(readModel));
  }

  static createInputToCreateTaskCommand(
    input: CreateTaskInput,
    reqUserId: string,
    context: RequestContext,
  ): CreateTaskCommand {
    return new CreateTaskCommand(
      input.title,
      input.categoryId,
      input.startDate,
      input.endDate,
      reqUserId,
      context,
    );
  }

  static updateInputToUpdateTaskCommand(
    input: UpdateTaskInput,
    reqUserId: string,
    context: RequestContext,
  ): UpdateTaskCommand {
    return new UpdateTaskCommand(
      input.taskId,
      reqUserId,
      context,
      input.title,
      input.categoryId,
      input.status,
      input.check,
      input.startDate,
      input.endDate,
    );
  }

  static deleteInputToDeleteTaskCommand(
    input: DeleteTaskInput,
    reqUserId: string,
    context: RequestContext,
  ): DeleteTaskCommand {
    return new DeleteTaskCommand(input.taskId, reqUserId, context);
  }
  static queryTaskByIdInputToTaskByIdQuery(
    input: QueryTaskByIdInput,
    reqUserId: string,
    context: RequestContext,
  ): TaskByIdQuery {
    return new TaskByIdQuery(reqUserId, input.taskId, context);
  }

  static queryTasksByCategoryIdToTaskByCategoryIdQuery(
    input: QueryTasksByCategoryIdInput,
    reqUserId: string,
    context: RequestContext,
  ): TasksByCategoryIdQuery {
    return new TasksByCategoryIdQuery(input.categoryId, reqUserId, context);
  }

  static readModelToCreateTaskOutput(
    readModel: TaskReadModel,
  ): CreateTaskOutput {
    return this.readModelToObjectType(readModel);
  }
  static readModelToUpdateTaskOutput(
    readModel: TaskReadModel,
  ): UpdateTaskOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelToQueryTaskByIdOutput(
    readModel: TaskReadModel,
  ): QueryTaskByIdOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelToDeleteTaskOutput(
    readModel: TaskReadModel,
  ): DeleteTaskOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelsToQueryTasksByCategoryIdOutput(
    readModels: TaskReadModel[],
  ): QueryTaskByCategoryIdOutput {
    return {
      tasks: this.readModelsToObjectType(readModels),
    };
  }
}
