import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { CreateTaskCommand } from '@project/application/port/in/command/task/create-task.command';
import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { Transactional } from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    public readonly projectService: ProjectService,
    public readonly taskService: TaskService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: CreateTaskCommand): Promise<Task> {
    try {
      await this.authorize(command.categoryId, command.userId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async authorize(categoryId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId,
    });
    TaskWorkflowPolicy.canAdd(project, reqUserId);
  }

  private async process(command: CreateTaskCommand): Promise<Task> {
    return await this.taskService.storeTask({
      categoryId: command.categoryId,
      endDate: command.endDate,
      startDate: command.startDate,
      title: command.title,
    });
  }
}
