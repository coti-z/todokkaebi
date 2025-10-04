import { DomainException, ErrorCode } from '@libs/exception';
import { Project } from '@project/domain/entity/project.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';

/*
 * 테스크 할당, 재할당
 */
export class TaskAssignmentPolicy {
  static canAssignmentTask(project: Project, requestUserId: string): void {
    if (!project || !requestUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectAdmin(project, requestUserId);
  }
}
