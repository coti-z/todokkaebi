import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { TasksByCategoryIdQuery } from '@project/application/port/in/query/task/task-by-categoryid.query';
import { TaskReadModel } from '@project/application/dto/task-read.model';
import { TaskApplicationMapper } from '@project/application/mapper/task.application.mapper';

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
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId: query.categoryId,
    });

    const tasks = await this.taskService.queryTasksByCategoryId({
      project,
      categoryId: query.categoryId,
      reqUserId: query.userId,
    });

    return TaskApplicationMapper.tasksToTaskReadModels(tasks);
  }
}
