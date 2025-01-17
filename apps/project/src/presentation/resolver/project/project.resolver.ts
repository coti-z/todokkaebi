import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from '@project/presentation/resolver/project/input/create-project.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseManager } from '@libs/response';
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  QueryProjectResponse,
  QueryProjectsResponse,
} from '@project/presentation/resolver/project/project.response';
import { DeleteProjectInput } from '@project/presentation/resolver/project/input/delete-project.input';
import { ProjectPresentationMapper } from '@project/presentation/mapper/project.presentation.mapper';
import { ProjectType } from '@project/presentation/resolver/type/project.type';
import { QueryProjectInput } from '@project/presentation/resolver/project/input/query-project.input';

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
