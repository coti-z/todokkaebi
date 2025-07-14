import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { CategoryService } from '@project/application/service/category.service';
import { CreateTaskCommand } from '@project/application/port/in/command/task/create-task.command';
import {
  ITransactionManager,
  TransactionManagerSymbol,
} from '@libs/database/index';
import { Transactional } from '@libs/database/decorator/transactional.decorator';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    public readonly projectService: ProjectService,
    public readonly taskService: TaskService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: CreateTaskCommand): Promise<Task> {
    try {
      const project = await this.projectService.queryProjectByCategoryId({
        categoryId: command.categoryId,
      });
      return await this.taskService.storeTask({
        categoryId: command.categoryId,

        endDate: command.endDate,
        project: project,
        reqUserId: command.userId,
        startDate: command.startDate,
        title: command.title,
      });
    } catch (error) {
      throw error;
    }
  }
}
