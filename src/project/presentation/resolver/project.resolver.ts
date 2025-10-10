import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { RequestContextExtractor } from '@libs/exception';
import { JwtPayload } from '@libs/jwt';
import { ResponseManager } from '@libs/response';

import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';

import { ProjectPresentationMapper } from '@project/presentation/mapper/project.presentation.mapper';
import {
  CreateProjectInput,
  DeleteProjectInput,
  QueryProjectInput,
  UpdateProjectInput,
} from '@project/presentation/resolver/input/project.input';
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  QueryProjectResponse,
  QueryProjectsResponse,
  UpdateProjectResponse,
} from '@project/presentation/resolver/response/project.response';
import { ProjectType } from '@project/presentation/resolver/type/project.type';

/**
 * Project Resolver graphql resolver
 *
 * @description
 * API endpoints responsible for query, creating, updating, and delete project
 *
 * @remarks
 * **security:**
 * - mutation and query require JWT authentication
 */
@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  // ─────────────────────────────────────
  // Health Check
  // ─────────────────────────────────────

  /**
   * @remarks
   * For Development/testing purposes only
   * @internal For development/test environment only
   */
  @Query(() => String)
  async healthCheck(): Promise<string> {
    return 'OK';
  }

  // ─────────────────────────────────────
  // Mutation
  // ─────────────────────────────────────

  /**
   * Create new project
   *
   * @remarks
   * - JWT authentication required
   * - Creator becomes project Admin automatically
   * - Initializes empty categories and memberships
   */
  @Mutation(() => CreateProjectResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async createProject(
    @Args('input') input: CreateProjectInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<CreateProjectResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);

    const command = ProjectPresentationMapper.toCreateProjectCommand(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.createProjectToOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Delete project
   *
   * @remarks
   * - JWT authentication required
   * - Only Admin can update project
   */
  @Mutation(() => DeleteProjectResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async deleteProject(
    @Args('input') input: DeleteProjectInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<DeleteProjectResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = ProjectPresentationMapper.toDeleteProjectCommand(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.deleteProjectToOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Delete project
   * @remarks
   * - JWT authentication required
   * - Only Admin or OWNER can update project
   * - Can update project name and other metadata
   *
   */

  @Mutation(() => UpdateProjectResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateProject(
    @Args('input') input: UpdateProjectInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<UpdateProjectResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command = ProjectPresentationMapper.toUpdateProjectCommand(
      input,
      payload.userId,
      requestContext,
    );

    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.updateProjectToOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Query single project by ID
   *
   * @remarks
   * - JWT authentication required
   * - User must have access permission (Admin/Member)
   * - Returns project with categories and memberships
   */
  @Query(() => QueryProjectResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async queryProject(
    @Args('input') input: QueryProjectInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<QueryProjectResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const query = ProjectPresentationMapper.toProjectQuery(
      input,
      payload.userId,
      requestContext,
    );
    const result = await this.queryBus.execute(query);
    const output = ProjectPresentationMapper.queryProjectToOutput(result);
    return ResponseManager.success(output);
  }

  /**
   * Query all projects accessible by current user
   *
   * @remarks
   * - JWT authentication required
   * - Returns projects when user is Admin or Member
   * - Includes project summary information
   */
  @Query(() => QueryProjectsResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async queryProjects(
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<QueryProjectsResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const query = ProjectPresentationMapper.toProjectsQuery(
      payload.userId,
      requestContext,
    );
    const result = await this.queryBus.execute(query);
    const output = ProjectPresentationMapper.queryProjectsToOutput(result);
    return ResponseManager.success(output);
  }
}
