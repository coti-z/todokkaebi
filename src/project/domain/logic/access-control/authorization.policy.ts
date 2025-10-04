import { DomainException, ErrorCode } from '@libs/exception';
import { Project } from '@project/domain/entity/project.entity';

// 권한 체크
export class AuthorizationPolicy {
  static requireProjectAdmin(project: Project, userId: string): void {
    if (!project || !userId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    if (!project.isAdmin(userId)) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }

  static requireProjectMembership(project: Project, userId: string): void {
    if (!project || !userId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    if (!project.hasAccessPermission(userId)) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
