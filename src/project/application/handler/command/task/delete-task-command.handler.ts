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
      const project = await this.projectService.queryProjectByTaskId({
        taskId: command.id,
      });
      await this.projectMembershipService.isProjectMember({
        projectId: project.id,
        userId: command.reqUserId,
      });
      return await this.taskService.deleteTask({
        id: command.id,
        reqUserId: command.reqUserId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
