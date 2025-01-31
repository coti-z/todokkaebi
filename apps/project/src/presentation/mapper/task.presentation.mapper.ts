import { CreateTaskCommand } from '@project/application/command/task/create-task.command';
import { TaskByIdQuery } from '@project/application/query/task-by-id.query';
import { Task } from '@project/domain/entity/task.entity';
import { TaskType } from '@project/presentation/resolver/type/task.type';
import {
  CreateTaskInput,
  DeleteTaskInput,
  QueryTaskByIdInput,
  QueryTasksByCategoryIdInput,
  UpdateTaskInput,
} from '../resolver/input/task.input';
import {
  CreateTaskOutput,
  DeleteTaskOutput,
  QueryTaskByCategoryIdOutput,
  QueryTaskByIdOutput,
  UpdateTaskOutput,
} from '../resolver/output/task.output';
import { TasksByCategoryIdQuery } from '@project/application/query/task-by-categoryid.query';
import { UpdateTaskCommand } from '@project/application/command/task/update-task.command';
import { DeleteTaskCommand } from '@project/application/command/delete-task.command';

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

  static createInputToCreateTaskCommand(
    input: CreateTaskInput,
    reqUserId: string,
  ): CreateTaskCommand {
    return new CreateTaskCommand(
      input.title,
      input.categoryId,
      input.startDate,
      input.endDate,
      reqUserId,
    );
  }

  static updateInputToUpdateTaskCommand(
    input: UpdateTaskInput,
    reqUserId: string,
  ): UpdateTaskInput {
    return new UpdateTaskCommand(
      input.id,
      reqUserId,
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
  ): DeleteTaskCommand {
    return new DeleteTaskCommand(input.id, reqUserId);
  }
  static queryTaskByIdInputToTaskByIdQuery(
    input: QueryTaskByIdInput,
    reqUserId: string,
  ): TaskByIdQuery {
    return new TaskByIdQuery(reqUserId, input.id);
  }

  static queryTasksByCategoryIdToTaskByCategoryIdQuery(
    input: QueryTasksByCategoryIdInput,
    reqUserId: string,
  ): TasksByCategoryIdQuery {
    return new TasksByCategoryIdQuery(input.categoryId, reqUserId);
  }

  static entityToCreateTaskOutput(entity: Task): CreateTaskOutput {
    return this.entityToObjectType(entity);
  }
  static entityToUpdateTaskOutput(entity: Task): UpdateTaskOutput {
    return this.entityToObjectType(entity);
  }

  static entityToQueryTaskByIdOutput(entity: Task): QueryTaskByIdOutput {
    return this.entityToObjectType(entity);
  }

  static entityToDeleteTaskOutput(entity: Task): DeleteTaskOutput {
    return this.entityToObjectType(entity);
  }

  static entitiesToQueryTasksByCategoryIdOutput(
    entities: Task[],
  ): QueryTaskByCategoryIdOutput {
    return {
      tasks: this.entitiesToObjectType(entities),
    };
  }
}
