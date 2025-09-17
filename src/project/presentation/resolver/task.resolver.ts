import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

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

import { TokenInfo } from '@libs/decorators';
import { JwtPayload } from '@libs/jwt';
import { ResponseManager } from '@libs/response';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { RequestContextExtractor } from '@libs/exception';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => CreateTaskResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async createTask(
    @Args('input') input: CreateTaskInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<CreateTaskResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = TaskPresentationMapper.createInputToCreateTaskCommand(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.readModelToCreateTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateTaskResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateTask(
    @Args('input') input: UpdateTaskInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<UpdateTaskResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = TaskPresentationMapper.updateInputToUpdateTaskCommand(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.readModelToUpdateTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => DeleteTaskResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async deleteTask(
    @Args('input') input: DeleteTaskInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<DeleteTaskResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = TaskPresentationMapper.deleteInputToDeleteTaskCommand(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = TaskPresentationMapper.readModelToDeleteTaskOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryTaskByIdResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async queryTaskById(
    @Args('input') input: QueryTaskByIdInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<QueryTaskByIdResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const query = TaskPresentationMapper.queryTaskByIdInputToTaskByIdQuery(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.queryBus.execute(query);
    const output =
      TaskPresentationMapper.readModelToQueryTaskByIdOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryTaskByCategoryIdResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async queryTasksByCategoryId(
    @Args('input') input: QueryTasksByCategoryIdInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<QueryTaskByCategoryIdResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const query =
      TaskPresentationMapper.queryTasksByCategoryIdToTaskByCategoryIdQuery(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.queryBus.execute(query);
    const output =
      TaskPresentationMapper.readModelsToQueryTasksByCategoryIdOutput(result);
    return ResponseManager.success(output);
  }
}
