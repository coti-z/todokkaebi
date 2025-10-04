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
import { CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { Task } from '@project/domain/entity/task.entity';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';

@Injectable()
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler
  implements ICommandHandler<UpdateTaskCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly redisService: RedisService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:task:${args[0].id}`],
    timing: 'after',
  })
  @Transactional()
  async execute(command: UpdateTaskCommand): Promise<Task> {
    try {
      await this.authorize(command.id, command.reqUserId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
  private async authorize(taskId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectByTaskId({
      taskId,
    });
    TaskWorkflowPolicy.canChangeStatus(project, reqUserId);
  }

  private async process(command: UpdateTaskCommand): Promise<Task> {
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
    });
  }
}
