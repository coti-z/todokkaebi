import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectInvitationPresentationMapper } from '../mapper/project-invitation.presentation.mapper';
import {
  AcceptProjectInvitationInput,
  CreateProjectInvitationInput,
  RejectProjectInvitationInput,
  UpdateProjectInvitationInput,
} from './input/project-invitation.input';
import {
  AcceptProjectInvitationResponse,
  CreateProjectInvitationResponse,
  RejectProjectInvitationResponse,
  UpdateProjectInvitationResponse,
} from './response/project-invitation.response';
import { ProjectInvitationType } from './type/project-invitation.type';
import { ResponseManager } from '@libs/response/response.manager';

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

  @Mutation(() => AcceptProjectInvitationResponse)
  async acceptProjectInvitation(
    @Args('input') input: AcceptProjectInvitationInput,
  ): Promise<AcceptProjectInvitationResponse> {
    const command =
      ProjectInvitationPresentationMapper.acceptProjectInvitationInputToCommand(
        input,
        'test2',
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToAcceptProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }

  @Mutation(() => RejectProjectInvitationResponse)
  async rejectProjectInvitation(
    @Args('input') input: RejectProjectInvitationInput,
  ): Promise<RejectProjectInvitationResponse> {
    const command =
      ProjectInvitationPresentationMapper.rejectProjectInvitationInputToCommand(
        input,
        'test2',
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToRejectProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }
}
