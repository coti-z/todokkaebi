import { UpdateTaskCommand } from '@/todo/application/commands/update-task.command';
import { TaskService } from '@/todo/application/services/task.service';
import { TaskResponse } from '@/todo/presentation/resolvers/dto/objects/task-response.object';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskService: TaskService) {}

  async execute(command: UpdateTaskCommand): Promise<TaskResponse> {
    try {
      await this.taskService.validateTaskWithUserId(command.id, command.userId);
      const task = await this.taskService.updateTask(command);
      return {
        success: true,
        task,
      };
    } catch (e) {
      throw e;
    }
  }
}
