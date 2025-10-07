import { DomainException, ErrorCode } from '@libs/exception';

import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { Project } from '@project/domain/entity/project.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

export class ProjectInvitationPolicy {
  static canCreateProjectInvitation(project: Project, reqUserId: string): void {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
  static canUpdateProjectInvitation(
    projectInvitation: ProjectInvitation,
    status: InvitationStatus,
    reqUserId: string,
  ): void {
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
