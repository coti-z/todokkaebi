import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { CreateTaskCommand } from '../create-task.command';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    public readonly projectService: ProjectService,
    public readonly taskService: TaskService,
  ) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    try {
      const project = await this.projectService.queryProjectByCategoryId({
        categoryId: command.categoryId,
      });
      return await this.taskService.storeTask({
        categoryId: command.categoryId,
        endDate: command.endDate,
        project: project,
        startDate: command.startDate,
        title: command.title,
        reqUserId: command.userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
