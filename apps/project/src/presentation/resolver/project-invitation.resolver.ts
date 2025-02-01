import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectInvitationType } from './type/project-invitation.type';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProjectInvitationResponse } from './response/project-invitation.response';
import { CreateProjectInvitationInput } from './input/project-invitation.input';
import { ProjectInvitationPresentationMapper } from '../mapper/project-invitation.presentation.mapper';
import { ResponseManager } from '@libs/response';

@Resolver(ProjectInvitationType)
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
}
