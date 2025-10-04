import { Project } from '../../entity/project.entity';
import type { ProjectInvitation } from '../../entity/project-invitation.entity';
import { DomainException, ErrorCode } from '@libs/exception';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';
export class ProjectInvitationPolicy {
  static canCreateProjectInvitation(project: Project, reqUserId: string) {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
  static canUpdateProjectInvitation(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ) {
    if (!projectInvitation) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    if (!status) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    if (!reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    if (projectInvitation.status !== InvitationStatus.PENDING) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }

    if (projectInvitation.inviteeUserId !== reqUserId) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
