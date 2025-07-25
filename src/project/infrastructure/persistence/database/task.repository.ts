import {
  BaseRepository,
  PrismaService,
  TransactionContext,
} from '@libs/database';
import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '@project/application/port/out/task-repository.port';
import { Task } from '@project/domain/entity/task.entity';
import { TaskInfraMapper } from '@project/infrastructure/mapper/task.infrastructure.mapper';

@Injectable()
export class TaskRepositoryImpl
  extends BaseRepository
  implements ITaskRepository
{
  async storeTask(entity: Task): Promise<void> {
    const client = this.getPrismaClient();
    const data = TaskInfraMapper.toPersistence(entity);
    await client.task.create({ data });
  }

  async updateTask(entity: Task): Promise<void> {
    const client = this.getPrismaClient();
    const data = TaskInfraMapper.toPersistence(entity);
    await client.task.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  async deleteTaskById(taskId: string): Promise<void> {
    const client = this.getPrismaClient();
    await client.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async queryTaskByCategoryId(categoryId: string): Promise<Task[]> {
    const client = this.getPrismaClient();
    const records = await client.task.findMany({
      where: {
        categoryId,
      },
    });
    return TaskInfraMapper.tasksToDomain(records);
  }

  async queryTaskByTaskId(taskId: string): Promise<Task | null> {
    const client = this.getPrismaClient();
    const record = await client.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!record) {
      return null;
    }

    return TaskInfraMapper.taskToDomain(record);
  }
}
