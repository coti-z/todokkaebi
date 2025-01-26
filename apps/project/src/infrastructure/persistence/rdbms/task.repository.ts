import { PrismaService } from '@libs/database';
import { ITaskRepository } from '@project/application/port/out/task-repository.port';
import { Task } from '@project/domain/entity/task.entity';
import { TaskInfraMapper } from '@project/infrastructure/mapper/task.infrastructure.mapper';

export class TaskRepositoryImpl implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async storeTask(entity: Task): Promise<void> {
    const data = TaskInfraMapper.toPersistence(entity);
    await this.prisma.task.create({
      data,
    });
  }
}
