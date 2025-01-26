import { Inject, Injectable } from '@nestjs/common';
import {
  ITaskRepository,
  TaskRepositorySymbol,
} from '../port/out/task-repository.port';
import { StoreTaskParams } from '../param/task.params';
import { Task } from '@project/domain/entity/task.entity';
import { TaskPolicyLogic } from '@project/domain/logic/task-policy.logic';

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
}
