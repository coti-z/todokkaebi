import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '@project/domain/entity/task.entity';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { DeleteTaskCommand } from '@project/application/port/in/command/task/delete-task.command';
import { Inject } from '@nestjs/common';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectMembershipService: ProjectMembershipService,
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
  async execute(command: DeleteTaskCommand): Promise<Task> {
    try {
      await this.authorize(command.id, command.reqUserId);
      return this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
  private async authorize(taskId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectByTaskId({
      taskId,
    });
    TaskWorkflowPolicy.canRemove(project, reqUserId);
  }

  private async process(command: DeleteTaskCommand): Promise<Task> {
    const task = await this.taskService.deleteTask({
      id: command.id,
    });

    return task;
  }
}
