import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { TasksByCategoryIdQuery } from '@project/application/query/task-by-categoryid.query';

@Injectable()
@QueryHandler(TasksByCategoryIdQuery)
export class TasksByCategoryIdQueryHandler
  implements IQueryHandler<TasksByCategoryIdQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  async execute(query: TasksByCategoryIdQuery): Promise<Task[]> {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId: query.categoryId,
    });

    const tasks = await this.taskService.queryTasksByCategoryId({
      project,
      categoryId: query.categoryId,
      reqUserId: query.userId,
    });

    return tasks;
  }
}
