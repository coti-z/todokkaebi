import { ErrorCode, errorFactory } from '@libs/exception';
import { Project } from '../entity/project.entity';
import type { ProjectInvitation } from '../entity/project-invitation.entity';
import { InvitationStatus } from '../value-objects/invation-status.vo';

export class ProjectInvitationLogic {
  static canProjectInvitation(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }

  static updateProjectInviationStatus(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ) {
    if (projectInvitation.inviteeUserId != reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }

    projectInvitation.update({
      status,
    });
  }
}
