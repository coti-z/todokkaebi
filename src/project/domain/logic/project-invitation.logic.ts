import { Project } from '../entity/project.entity';
import type { ProjectInvitation } from '../entity/project-invitation.entity';
import { InvitationStatus } from '../value-objects/invation-status.vo';
import { ApplicationException, ErrorCode } from '@libs/exception';
export class ProjectInvitationLogic {
  static canProjectInvitation(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
  }
  static updateProjectInviationStatus(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ) {
    if (projectInvitation.inviteeUserId != reqUserId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }

    projectInvitation.update({
      status,
    });
  }

  static acceptProjectInvitation(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ) {
    if (projectInvitation.status !== InvitationStatus.PENDING) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }

    if (projectInvitation.inviteeUserId !== reqUserId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }

    projectInvitation.update({
      status,
    });
  }

  static rejectProjectInvitation(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ) {
    if (projectInvitation.status !== InvitationStatus.PENDING) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }

    if (projectInvitation.inviteeUserId !== reqUserId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    projectInvitation.update({
      status,
    });
  }
}
