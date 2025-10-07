import { DomainException, ErrorCode } from '@libs/exception';

import { Project } from '@project/domain/entity/project.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';
// 생성, 수정, 삭제
export class CategoryOrganizationPolicy {
  static canQueryCategory(project: Project, reqUserId: string) {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
  static canCreateCategory(project: Project, reqUserId: string) {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
  static canDeleteCategory(project: Project, reqUserId: string) {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
  static canChangeCategoryName(project: Project, reqUserId: string) {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
}
