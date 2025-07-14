import { Project } from '../entity/project.entity';

import { Task, TaskMutableProps } from '../entity/task.entity';

import { errorFactory } from '@libs/exception/error-factory.exception';
import { ErrorCode } from '@libs/exception/error-code.enum';

export type updateReq = Partial<TaskMutableProps>;

export class TaskPolicyLogic {
  static canCreateTask(project: Project, reqUserId: string): void {
    this.assertCheckAdmin(project, reqUserId);
  }

  static canQueryTask(project: Project, reqUserId: string): void {
    this.assertCheckAdmin(project, reqUserId);
  }

  static canQueryTaskByCategoryId(project: Project, reqUserId: string): void {
    this.assertCheckAdmin(project, reqUserId);
  }

  static canDeleteTask(project: Project, reqUserId: string): void {
    this.assertCheckAdmin(project, reqUserId);
  }

  static updateTask(
    req: updateReq,
    project: Project,
    reqUserId: string,
    task: Task,
  ): void {
    this.assertCheckAdmin(project, reqUserId);
    task.update(req);
  }

  static assertCheckAdmin(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
