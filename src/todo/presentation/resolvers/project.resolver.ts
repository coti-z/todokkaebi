import { CreateProjectCommand } from '@/todo/application/commands/create-project.command';
import { DeleteProjectCommand } from '@/todo/application/commands/delete-project.command';
import { UpdateProjectCommand } from '@/todo/application/commands/update-project.command';
import { GetAllProjectsQuery } from '@/todo/application/queries/get-all-projects.query';
import { GetProjectQuery } from '@/todo/application/queries/get-project.query';
import { CreateProjectInput } from '@/todo/presentation/resolvers/dto/inputs/create-project.input';
import { DeleteProjectInput } from '@/todo/presentation/resolvers/dto/inputs/delete-project.input';
import { GetProjectInput } from '@/todo/presentation/resolvers/dto/inputs/get-project.input';
import { UpdateProjectInput } from '@/todo/presentation/resolvers/dto/inputs/update-project.input';
import { GetAllProjectsResponse } from '@/todo/presentation/resolvers/dto/objects/get-all-projects.object';
import { ProjectResponse } from '@/todo/presentation/resolvers/dto/objects/project.response';
import { TokenInfo } from '@/utils/decorators/token-info.decorator';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { JwtPayload } from '@/utils/jwt/jwt-token.interface';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => ProjectResponse)
export class ProjectResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProjectResponse)
  async createProject(
    @Args('input') input: CreateProjectInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<ProjectResponse> {
    const command = new CreateProjectCommand(payload.userId, input.name);
    return await this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ProjectResponse)
  async getProject(
    @Args('input') input: GetProjectInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<ProjectResponse> {
    const query = new GetProjectQuery(payload.userId, input.id);
    return await this.queryBus.execute(query);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetAllProjectsResponse)
  async getAllProjects(
    @TokenInfo() payload: JwtPayload,
  ): Promise<GetAllProjectsResponse> {
    const query = new GetAllProjectsQuery(payload.userId);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Args('input') input: DeleteProjectInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<ProjectResponse> {
    const command = new DeleteProjectCommand(payload.userId, input.projectId);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Args('input') input: UpdateProjectInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<ProjectResponse> {
    const command = new UpdateProjectCommand(
      payload.userId,
      input.projectId,
      input.name,
    );

    return await this.commandBus.execute(command);
  }
}
