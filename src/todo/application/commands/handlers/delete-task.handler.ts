import { DeleteTaskCommand } from '@/todo/application/commands/delete-task.command';
import { TaskService } from '@/todo/application/services/task.service';
import { TaskResponse } from '@/todo/presentation/resolvers/dto/objects/task-response.object';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskService: TaskService) {}
  async execute(command: DeleteTaskCommand): Promise<TaskResponse> {
    try {
      await this.taskService.validateTaskWithUserId(command.id, command.userId);

      const task = await this.taskService.deleteTask(command);
      return {
        success: true,
        task,
      };
    } catch (e) {
      throw e;
    }
  }
}
