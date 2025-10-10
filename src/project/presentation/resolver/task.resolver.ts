import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { RequestContextExtractor } from '@libs/exception';
import { JwtPayload } from '@libs/jwt';
import { ResponseManager } from '@libs/response';

import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';

import { TaskPresentationMapper } from '@project/presentation/mapper/task.presentation.mapper';
import {
  CreateTaskInput,
  DeleteTaskInput,
  QueryTaskByIdInput,
  QueryTasksByCategoryIdInput,
  UpdateTaskInput,
} from '@project/presentation/resolver/input/task.input';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  QueryTaskByCategoryIdResponse,
  QueryTaskByIdResponse,
  UpdateTaskResponse,
} from '@project/presentation/resolver/response/task.response';
import { TaskType } from '@project/presentation/resolver/type/task.type';

/**
 * Task Graph Resolver
 *
 * @remarks
 * Handles task management operation within categories
 *
 * security:
 * - All operations require JWT authentication
 * - User must have project access permission
 *
 */
@Resolver(() => TaskType)
export class TaskResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  // ─────────────────────────────────────
  // Mutation
  // ─────────────────────────────────────

  /**
   * Create new task in category
   *
   * @remarks
   * - JWT authentication required
   */
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

  /**
   * Update task information
   *
   * @remarks
   * - JWT authentication required
   * - Can update time, status, dates, check state, category id
   * - Validates date constraints if dates are updated
   */
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

  /**
   * Delete task
   *
   * @remarks
   * - JWT authentication required
   * - Removes task from category
   * - Permanent deletion (cannot be undone)
   */
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

  /**
   * Query single task by ID
   *
   * @remarks
   * - JWT authentication required
   * - User must have access to the project containing this task
   */
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

  /**
   * Query all tasks in a category
   *
   * @remarks
   * - JWT authentication required
   * - User must have access to the project
   */
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
