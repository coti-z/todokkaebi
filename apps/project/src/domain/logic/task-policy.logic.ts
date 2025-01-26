import { ErrorCode, errorFactory } from '@libs/exception';
import { Project } from '../entity/project.entity';

export class TaskPolicyLogic {
  static canCreateTask(project: Project, reqUserId: string): void {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
