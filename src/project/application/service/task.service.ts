import { Inject, Injectable } from '@nestjs/common';
import { isUndefined, omitBy } from 'lodash';

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
import { Task } from '@project/domain/entity/task.entity';

import { ApplicationException, ErrorCode } from '@libs/exception';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepositorySymbol)
    private readonly taskRepo: ITaskRepository,
  ) {}

  async storeTask(params: StoreTaskParams): Promise<Task> {
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
    const task = await this.taskRepo.queryTaskByTaskId(
      params.updateDataParams.id,
    );
    if (!task) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    task.update({
      title: params.updateDataParams.title,
      categoryId: params.updateDataParams.categoryId,
      check: params.updateDataParams.check,
      taskStatus: params.updateDataParams.taskStatus,
    });

    await this.taskRepo.updateTask(task);
    return task;
  }

  async deleteTask(params: DeleteTaskParams): Promise<Task> {
    const task = await this.taskRepo.queryTaskByTaskId(params.id);
    if (!task) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    await this.taskRepo.deleteTaskById(params.id);
    return task;
  }

  async queryTaskById(params: QueryTaskByIdParams): Promise<Task> {
    const task = await this.taskRepo.queryTaskByTaskId(params.id);

    if (!task) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    return task;
  }

  async queryTasksByCategoryId(
    params: QueryTasksByCategoryIdParams,
  ): Promise<Task[]> {
    const tasks = await this.taskRepo.queryTaskByCategoryId(params.categoryId);
    return tasks;
  }
}
