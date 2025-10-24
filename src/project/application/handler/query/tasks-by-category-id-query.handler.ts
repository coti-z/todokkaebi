import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskReadModel } from '@project/application/dto/task-read.model';
import { TaskApplicationMapper } from '@project/application/mapper/task.application.mapper';
import { TasksByCategoryIdQuery } from '@project/application/port/in/query/task/task-by-categoryid.query';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';

@Injectable()
@QueryHandler(TasksByCategoryIdQuery)
export class TasksByCategoryIdQueryHandler
  implements IQueryHandler<TasksByCategoryIdQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  async execute(query: TasksByCategoryIdQuery): Promise<TaskReadModel[]> {
    await this.authorize(query.categoryId, query.userId);
    return await this.process(query);
  }
  private async authorize(
    categoryId: string,
    reqUserId: string,
  ): Promise<void> {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId,
    });
    TaskWorkflowPolicy.canQuery(project, reqUserId);
  }

  private async process(
    query: TasksByCategoryIdQuery,
  ): Promise<TaskReadModel[]> {
    const tasks = await this.taskService.queryTasksByCategoryId({
      categoryId: query.categoryId,
    });
    return TaskApplicationMapper.tasksToTaskReadModels(tasks);
  }
}
