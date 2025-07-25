import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  QueryProjectResponse,
  QueryProjectsResponse,
  UpdateProjectResponse,
} from '@project/presentation/resolver/response/project.response';
import { ProjectPresentationMapper } from '@project/presentation/mapper/project.presentation.mapper';
import { ProjectType } from '@project/presentation/resolver/type/project.type';
import {
  CreateProjectInput,
  DeleteProjectInput,
  QueryProjectInput,
  UpdateProjectInput,
} from '@project/presentation/resolver/input/project.input';
import { ResponseManager } from '@libs/response';

@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => String)
  async healthCheck() {
    return 'OK';
  }

  @Mutation(() => CreateProjectResponse)
  async createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<CreateProjectResponse> {
    const command = ProjectPresentationMapper.toCreateProjectCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.createProjectToOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => DeleteProjectResponse)
  async deleteProject(
    @Args('input') input: DeleteProjectInput,
  ): Promise<DeleteProjectResponse> {
    const command = ProjectPresentationMapper.toDeleteProjectCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.deleteProjectToOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateProjectResponse)
  async updateProject(
    @Args('input') input: UpdateProjectInput,
  ): Promise<UpdateProjectResponse> {
    const command = ProjectPresentationMapper.toUpdateProjectCommand(
      input,
      'test',
    );

    const result = await this.commandBus.execute(command);
    const output = ProjectPresentationMapper.updateProjectToOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryProjectResponse)
  async queryProject(
    @Args('input') input: QueryProjectInput,
  ): Promise<QueryProjectResponse> {
    const query = ProjectPresentationMapper.toProjectQuery(input, 'Test');
    const result = await this.queryBus.execute(query);
    const output = ProjectPresentationMapper.queryProjectToOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryProjectsResponse)
  async queryProjects(): Promise<QueryProjectsResponse> {
    const query = ProjectPresentationMapper.toProjectsQuery('test');
    const result = await this.queryBus.execute(query);
    const output = ProjectPresentationMapper.queryProjectsToOutput(result);
    return ResponseManager.success(output);
  }
}
