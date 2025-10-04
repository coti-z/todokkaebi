import { DomainException, ErrorCode } from '@libs/exception';
import { Project } from '@project/domain/entity/project.entity';
import { TaskMutableProps } from '@project/domain/entity/task.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';

export type updateReq = Partial<TaskMutableProps>;

/*
 * 생성, 수정, 삭제, 완료
 */
export class TaskWorkflowPolicy {
  static canQuery(project: Project, reqUserId: string): void {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }

  static canAdd(project: Project, reqUserId: string): void {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }

  static canRemove(project: Project, reqUserId: string): void {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }

  static canChangeStatus(project: Project, reqUserId: string): void {
    if (!project || !reqUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    AuthorizationPolicy.requireProjectMembership(project, reqUserId);
  }
}
