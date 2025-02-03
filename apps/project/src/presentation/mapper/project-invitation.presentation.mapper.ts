import { CreateProjectInvitationCommand } from '@project/application/command/project-invitation/create-project-invitation.command';
import { UpdateProjectInvitationCommand } from '@project/application/command/project-invitation/update-project-invitation.command';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';
import {
  AcceptProjectInvitationInput,
  CreateProjectInvitationInput,
  RejectProjectInvitationInput,
  type UpdateProjectInvitationInput,
} from '../resolver/input/project-invitation.input';
import {
  AcceptProjectInvitationOutput,
  CreateaProjectInvitationOutput,
  RejectProjectInvitationOutput,
  type UpdateProjectInvitationOutput,
} from '../resolver/output/project-invitation.output';
import { AcceptProjectInvitationCommand } from '@project/application/command/project-invitation/accept-project-invitation.command';
import { RejectProjectInvitationCommand } from '@project/application/command/project-invitation/reject-project-invitation.command';

export class ProjectInvitationPresentationMapper {
  static entityToObjectType(entity: ProjectInvitation): ProjectInvitationType {
    return {
      updatedAt: entity.updatedAt,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      inviterUserId: entity.inviterUserId,
      status: entity.status,
      inviteeUserId: entity.inviteeUserId,
      id: entity.id,
    };
  }

  static entitiesToObjectType(
    entities: ProjectInvitation[],
  ): ProjectInvitationType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }

  /* -------------------------------------------------------------------------- */
  /*                           input to commnet, query                          */
  /* -------------------------------------------------------------------------- */

  static createProjectInvitationInputToCommand(
    input: CreateProjectInvitationInput,
    inviterUserId: string,
  ): CreateProjectInvitationCommand {
    return new CreateProjectInvitationCommand(
      input.projectId,
      inviterUserId,
      input.inviteeUserId,
    );
  }

  static updateProjectInvitationInputToCommand(
    input: UpdateProjectInvitationInput,
    reqUserId: string,
  ): UpdateProjectInvitationCommand {
    return new UpdateProjectInvitationCommand(
      input.id,
      reqUserId,
      input.status,
    );
  }

  static acceptProjectInvitationInputToCommand(
    input: AcceptProjectInvitationInput,
    reqUserId: string,
  ): AcceptProjectInvitationCommand {
    return new AcceptProjectInvitationCommand(input.id, reqUserId);
  }

  static rejectProjectInvitationInputToCommand(
    input: RejectProjectInvitationInput,
    reqUserId: string,
  ): RejectProjectInvitationCommand {
    return new RejectProjectInvitationCommand(input.id, reqUserId);
  }

  /* -------------------------------------------------------------------------- */
  /*                               entity To Ouput                              */
  /* -------------------------------------------------------------------------- */

  static entityToCreateProjectInvitationOutput(
    entity: ProjectInvitation,
  ): CreateaProjectInvitationOutput {
    return this.entityToObjectType(entity);
  }

  static entityToUpdateProjectInvitationOutput(
    entity: ProjectInvitation,
  ): UpdateProjectInvitationOutput {
    return this.entityToObjectType(entity);
  }

  static entityToRejectProjectInvitationOutput(
    entity: ProjectInvitation,
  ): RejectProjectInvitationOutput {
    return this.entityToObjectType(entity);
  }

  static entityToAcceptProjectInvitationOutput(
    entity: ProjectInvitation,
  ): AcceptProjectInvitationOutput {
    return this.entityToObjectType(entity);
  }
}
