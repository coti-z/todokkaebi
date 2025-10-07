import { RequestContext } from '@libs/exception';

import { ProjectInvitationReadModel } from '@project/application/dto/project-invitation-read.model';
import { CreateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/create-project-invitation.command';
import { UpdateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/update-project-invitation.command';
import {
  CreateProjectInvitationInput,
  UpdateProjectInvitationStatusInput,
} from '@project/presentation/resolver/input/project-invitation.input';
import {
  AcceptProjectInvitationOutput,
  CreateProjectInvitationOutput,
  RejectProjectInvitationOutput,
  UpdateProjectInvitationOutput,
} from '@project/presentation/resolver/output/project-invitation.output';
import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';
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
    input: UpdateProjectInvitationStatusInput,
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

  /* -------------------------------------------------------------------------- */
  /*                               readModel To Output                              */
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
