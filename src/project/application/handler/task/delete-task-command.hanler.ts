import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '@project/domain/entity/task.entity';
import { ProjectService } from '@project/application/service/project.service';
import { CategoryService } from '@project/application/service/category.service';
import { TaskService } from '@project/application/service/task.service';
import { DeleteTaskCommand } from '@project/application/port/in/command/task/delete-task.command';
import { Inject } from '@nestjs/common';
import {
  ITransactionManager,
  TransactionManagerSymbol,
} from '@libs/database/index';
import { Transactional } from '@libs/database/decorator/transactional.decorator';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
  ) {}

  @Transactional()
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
