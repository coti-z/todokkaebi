import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from '../../delete-task.command';
import { Task } from '@project/domain/entity/task.entity';
import { ProjectService } from '@project/application/service/project.service';
import { CategoryService } from '@project/application/service/category.service';
import { TaskService } from '@project/application/service/task.service';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}
  async execute(command: DeleteTaskCommand): Promise<Task> {
    const project = await this.projectService.queryProjectByTaskId({
      taskId: command.id,
    });
    return await this.taskService.deleteTask({
      id: command.id,
      project: project,
      reqUserId: command.reqUserId,
    });
  }
}
