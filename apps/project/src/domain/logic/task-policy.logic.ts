import { ErrorCode, errorFactory } from '@libs/exception';
import { Project } from '../entity/project.entity';
import { Category } from '../entity/category.entity';
import { Task, TaskMutableProps } from '../entity/task.entity';

export type updateReq = Partial<TaskMutableProps> &
  Pick<Task, 'id'> & {
    project: Project;
    reqUserId: string;
    task: Task;
  };

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

  static updateTask(req: updateReq): void {
    req.task.partialUpdate({
      title: req.title,
      categoryId: req.categoryId,
      check: req.check,
      status: req.status,
      startDate: req.startDate,
      endDate: req.endDate,
      actualEndDate: req.actualEndDate,
      actualStartDate: req.actualStartDate,
    });
  }

  static assertCheckAdmin(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
