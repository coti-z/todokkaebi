import { CreateTaskCommand } from '@/todo/application/commands/create-task.command';
import { CategoryService } from '@/todo/application/services/category.service';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { TaskService } from '@/todo/application/services/task.service';
import { TaskResponse } from '@/todo/presentation/resolvers/dto/objects/task-response.object';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}
  async execute(command: CreateTaskCommand): Promise<TaskResponse> {
    try {
      await this.categoryService.validateUserId(
        command.userId,
        command.categoryId,
      );
      const task = await this.taskService.createTask(command);
      return {
        success: true,
        task,
      };
    } catch (e) {
      throw e;
    }
  }
}
