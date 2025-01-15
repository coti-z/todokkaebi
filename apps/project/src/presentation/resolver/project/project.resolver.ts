import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from '@project/presentation/resolver/project/input/create-project.input';
import { CommandBus } from '@nestjs/cqrs';
import { ProjectPresentationResolverMapper } from '@project/presentation/mapper/project.presentation.mapper';
import { ResponseManager } from '@libs/response';
import { CreateProjectResponse } from '@project/presentation/resolver/project/project.response';

@Resolver('project')
export class ProjectResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  async healthCheck() {
    return 'OK';
  }
  @Mutation(() => CreateProjectResponse)
  async createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<CreateProjectResponse> {
    const command = ProjectPresentationResolverMapper.toCreateProjectCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectPresentationResolverMapper.createProjectToOutput(result);
    return ResponseManager.success(output);
  }
}
