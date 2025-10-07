import { Inject, Injectable } from '@nestjs/common';

import { ApplicationException, ErrorCode } from '@libs/exception';

import {
  DeleteTaskParams,
  QueryTaskByIdParams,
  QueryTasksByCategoryIdParams,
  StoreTaskParams,
  UpdateTaskParams,
} from '@project/application/param/task.params';
import {
  ITaskRepository,
  TaskRepositorySymbol,
} from '@project/application/port/out/task-repository.port';
import { Task } from '@project/domain/entity/task.entity';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

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
    const task = await this.taskRepo.queryTaskByTaskId(params.id);
    if (!task) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    if (params.categoryId) {
      task.changeCategory(params.categoryId);
    }

    if (params.taskStatus === TaskState.COMPLETE) {
      task.markAsCompleted();
    }

    if (params.taskStatus === TaskState.IN_PROGRESS) {
      task.markAsInProgress();
    }

    if (params.taskStatus === TaskState.PENDING) {
      task.markAsPending();
    }

    if (params.title) {
      task.changeTitle(params.title);
    }

    if (params.startDate) {
      task.reschedule(params.startDate, task.endDate);
    }

    if (params.endDate) {
      task.reschedule(task.startDate, params.endDate);
    }

    if (params.check === true) {
      task.markAsCompleted();
    }
    if (params.check === false) {
      if (task.startDate > new Date()) {
        task.markAsPending();
      } else {
        task.markAsInProgress();
      }
    }

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
