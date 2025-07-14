import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskByIdQuery } from '../task-by-id.query';
import { TaskService } from '@project/application/service/task.service';
import { Task } from '@project/domain/entity/task.entity';
import { ProjectService } from '@project/application/service/project.service';

@QueryHandler(TaskByIdQuery)
export class TaskByIdQueryHadnler implements IQueryHandler<TaskByIdQuery> {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  async execute(query: TaskByIdQuery): Promise<Task> {
    const project = await this.projectService.queryProjectByTaskId({
      taskId: query.id,
    });
    return await this.taskService.queryTaskById({
      id: query.id,
      project: project,
      reqUserId: query.userId,
    });
  }
}
