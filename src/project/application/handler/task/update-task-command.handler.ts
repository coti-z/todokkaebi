import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { UpdateTaskCommand } from '@project/application/port/in/command/task/update-task.command';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

@Injectable()
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler
  implements ICommandHandler<UpdateTaskCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  async execute(command: UpdateTaskCommand): Promise<any> {
    try {
      const project = await this.projectService.queryProjectByTaskId({
        taskId: command.id,
      });

      return await this.taskService.updateTask({
        updateDataParams: {
          id: command.id,
          categoryId: command.categoryId,
          check: command.check,
          title: command.title,
          taskStatus: command.status,
          actualStartDate: command.actualStartDate,
          actualEndDate: command.actualEndDate,
          startDate: command.startDate,
          endDate: command.endDate,
        },
        reqUserId: command.reqUserId,
        project: project,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
