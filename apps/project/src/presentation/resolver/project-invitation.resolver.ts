import { ResponseManager } from '@libs/response';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectInvitationPresentationMapper } from '../mapper/project-invitation.presentation.mapper';
import {
  CreateProjectInvitationInput,
  UpdateProjectInvitationInput,
} from './input/project-invitation.input';
import {
  CreateProjectInvitationResponse,
  UpdateProjectInvitationResponse,
} from './response/project-invitation.response';
import { ProjectInvitationType } from './type/project-invitation.type';

@Resolver(() => ProjectInvitationType)
export class ProjectInvitationResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => CreateProjectInvitationResponse)
  async createProjectInvitation(
    @Args('input') input: CreateProjectInvitationInput,
  ): Promise<CreateProjectInvitationResponse> {
    const command =
      ProjectInvitationPresentationMapper.createProjectInvitationInputToCommand(
        input,
        'test',
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToCreateProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateProjectInvitationResponse)
  async updateProjectInvitation(
    @Args('input') input: UpdateProjectInvitationInput,
  ): Promise<UpdateProjectInvitationResponse> {
    const command =
      ProjectInvitationPresentationMapper.updateProjectInvitationInputToCommand(
        input,
        'test2',
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToUpdateProjectInvitationOutput(
        result,
      );

    return ResponseManager.success(output);
  }
}
