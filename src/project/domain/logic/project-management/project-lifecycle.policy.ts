import { DomainException, ErrorCode } from '@libs/exception';

import { Project } from '@project/domain/entity/project.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';

/*
 * 생성, 삭제, 아카이브
 */
export class ProjectLifeCyclePolicy {
  static canQueryProject(project: Project, userId: string) {
    if (!project || !userId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, userId);
  }
  static canChangeProjectName(project: Project, userId: string) {
    if (!project || !userId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectAdmin(project, userId);
  }

  static canDeleteProject(project: Project, userId: string) {
    if (!project || !userId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectAdmin(project, userId);
  }
}
