import { ResponseManager } from '@libs/response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskPresentationMapper } from '../mapper/task.presentation.mapper';
import {
  CreateTaskInput,
  DeleteTaskInput,
  QueryTaskByIdInput,
  QueryTasksByCategoryIdInput,
  UpdateTaskInput,
} from './input/task.input';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  QueryTaskByCategoryIdResponse,
  QueryTaskByIdResponse,
  UpdateTaskResponse,
} from './response/task.response';
import { TaskType } from './type/task.type';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => CreateTaskResponse)
  async createTask(
    @Args('input') input: CreateTaskInput,
  ): Promise<CreateTaskResponse> {
    const command = TaskPresentationMapper.createInputToCreateTaskCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.entityToCreateTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateTaskResponse)
  async updateTask(
    @Args('input') input: UpdateTaskInput,
  ): Promise<UpdateTaskResponse> {
    const command = TaskPresentationMapper.updateInputToUpdateTaskCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.entityToUpdateTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => DeleteTaskResponse)
  async deleteTask(
    @Args('input') input: DeleteTaskInput,
  ): Promise<DeleteTaskResponse> {
    const command = TaskPresentationMapper.deleteInputToDeleteTaskCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.entityToDeleteTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryTaskByIdResponse)
  async queryTaskById(
    @Args('input') input: QueryTaskByIdInput,
  ): Promise<QueryTaskByIdResponse> {
    const query = TaskPresentationMapper.queryTaskByIdInputToTaskByIdQuery(
      input,
      'test',
    );
    const result = await this.queryBus.execute(query);
    const output = TaskPresentationMapper.entityToQueryTaskByIdOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryTaskByCategoryIdResponse)
  async queryTasksByCategoryId(
    @Args('input') input: QueryTasksByCategoryIdInput,
  ): Promise<QueryTaskByCategoryIdResponse> {
    const query =
      TaskPresentationMapper.queryTasksByCategoryIdToTaskByCategoryIdQuery(
        input,
        'test',
      );
    const result = await this.queryBus.execute(query);
    const output =
      TaskPresentationMapper.entitiesToQueryTasksByCategoryIdOutput(result);
    return ResponseManager.success(output);
  }
}
