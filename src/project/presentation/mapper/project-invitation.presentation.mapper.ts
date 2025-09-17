import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';
import {
  AcceptProjectInvitationInput,
  CreateProjectInvitationInput,
  RejectProjectInvitationInput,
  type UpdateProjectInvitationInput,
} from '../resolver/input/project-invitation.input';
import {
  AcceptProjectInvitationOutput,
  CreateProjectInvitationOutput,
  RejectProjectInvitationOutput,
  type UpdateProjectInvitationOutput,
} from '../resolver/output/project-invitation.output';
import { CreateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/create-project-invitation.command';
import { UpdateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/update-project-invitation.command';
import { AcceptProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/accept-project-invitation.command';
import { RejectProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/reject-project-invitation.command';
import { RequestContext } from '@libs/exception';
import { ProjectInvitationReadModel } from '@project/application/dto/project-invitation-read.model';

export class ProjectInvitationPresentationMapper {
  static readModelToObjectType(
    readModel: ProjectInvitationReadModel,
  ): ProjectInvitationType {
    return {
      updatedAt: readModel.updatedAt,
      projectId: readModel.projectId,
      createdAt: readModel.createdAt,
      inviterUserId: readModel.inviterUserId,
      status: readModel.status,
      inviteeUserId: readModel.inviteeUserId,
      id: readModel.id,
    };
  }

  static readModelsToObjectType(
    readModels: ProjectInvitationReadModel[],
  ): ProjectInvitationType[] {
    if (!readModels) return [];
    return readModels.map(readModel => this.readModelToObjectType(readModel));
  }

  /* -------------------------------------------------------------------------- */
  /*                           input to commnet, query                          */
  /* -------------------------------------------------------------------------- */

  static createProjectInvitationInputToCommand(
    input: CreateProjectInvitationInput,
    inviterUserId: string,
    context: RequestContext,
  ): CreateProjectInvitationCommand {
    return new CreateProjectInvitationCommand(
      input.projectId,
      inviterUserId,
      input.inviteeUserId,
      context,
    );
  }

  static updateProjectInvitationInputToCommand(
    input: UpdateProjectInvitationInput,
    reqUserId: string,
    context: RequestContext,
  ): UpdateProjectInvitationCommand {
    return new UpdateProjectInvitationCommand(
      input.id,
      reqUserId,
      input.status,
      context,
    );
  }

  static acceptProjectInvitationInputToCommand(
    input: AcceptProjectInvitationInput,
    reqUserId: string,
    context: RequestContext,
  ): AcceptProjectInvitationCommand {
    return new AcceptProjectInvitationCommand(input.id, reqUserId, context);
  }

  static rejectProjectInvitationInputToCommand(
    input: RejectProjectInvitationInput,
    reqUserId: string,
    context: RequestContext,
  ): RejectProjectInvitationCommand {
    return new RejectProjectInvitationCommand(input.id, reqUserId, context);
  }

  /* -------------------------------------------------------------------------- */
  /*                               readModel To Ouput                              */
  /* -------------------------------------------------------------------------- */

  static readModelToCreateProjectInvitationOutput(
    readModel: ProjectInvitationReadModel,
  ): CreateProjectInvitationOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelToUpdateProjectInvitationOutput(
    readModel: ProjectInvitationReadModel,
  ): UpdateProjectInvitationOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelToRejectProjectInvitationOutput(
    readModel: ProjectInvitationReadModel,
  ): RejectProjectInvitationOutput {
    return this.readModelToObjectType(readModel);
  }

  static readModelToAcceptProjectInvitationOutput(
    readModel: ProjectInvitationReadModel,
  ): AcceptProjectInvitationOutput {
    return this.readModelToObjectType(readModel);
  }
}
