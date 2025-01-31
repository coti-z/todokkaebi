import { ErrorCode, errorFactory } from '@libs/exception';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@project/domain/entity/task.entity';
import { TaskPolicyLogic } from '@project/domain/logic/task-policy.logic';
import {
  DeleteTaskParams,
  QueryTaskByIdParams,
  QueryTasksByCategoryIdParams,
  StoreTaskParams,
  UpdateTaskParams,
} from '../param/task.params';
import {
  ITaskRepository,
  TaskRepositorySymbol,
} from '../port/out/task-repository.port';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepositorySymbol)
    private readonly taskRepo: ITaskRepository,
  ) {}

  async storeTask(params: StoreTaskParams): Promise<Task> {
    TaskPolicyLogic.canCreateTask(params.project, params.reqUserId);
    const task = Task.create({
      categoryId: params.categoryId,
      endDate: params.endDate,
      startDate: params.startDate,
      title: params.title,
    });
    await this.taskRepo.storeTask(task);
    return task;
  }

  async updateTask(params: UpdateTaskParams): Promise<Task> {
    const task = await this.taskRepo.queryTaskByTaskId(params.id);
    if (!task) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    TaskPolicyLogic.updateTask({
      id: params.id,
      project: params.project,
      reqUserId: params.reqUserId,
      task: task,
      actualEndDate: params.actualEndDate,
      actualStartDate: params.actualStartDate,
      categoryId: params.categoryId,
      check: params.check,
      endDate: params.endDate,
      startDate: params.startDate,
      status: params.status,
      title: params.title,
      updatedAt: params.updatedAt,
    });

    return task;
  }
  async deleteTask(params: DeleteTaskParams): Promise<Task> {
    const task = await this.taskRepo.queryTaskByTaskId(params.id);
    if (!task) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    TaskPolicyLogic.canDeleteTask(params.project, params.reqUserId);
    await this.taskRepo.deleteTaskById(params.id);
    return task;
  }

  async queryTaskById(params: QueryTaskByIdParams): Promise<Task> {
    TaskPolicyLogic.canQueryTask(params.project, params.reqUserId);
    const task = await this.taskRepo.queryTaskByTaskId(params.id);

    if (!task) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return task;
  }

  async queryTasksByCategoryId(
    params: QueryTasksByCategoryIdParams,
  ): Promise<Task[]> {
    TaskPolicyLogic.canQueryTaskByCategoryId(params.project, params.reqUserId);
    const tasks = await this.taskRepo.queryTaskByCategoryId(params.categoryId);
    return tasks;
  }
}
