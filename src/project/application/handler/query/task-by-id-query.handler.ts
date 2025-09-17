import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskByIdQuery } from '../../port/in/query/task/task-by-id.query';
import { TaskService } from '@project/application/service/task.service';
import { ProjectService } from '@project/application/service/project.service';
import { TaskReadModel } from '@project/application/dto/task-read.model';
import { TaskApplicationMapper } from '@project/application/mapper/task.application.mapper';
import { Cache } from '@libs/decorators';
import { RedisService } from '@libs/redis';

@QueryHandler(TaskByIdQuery)
export class TaskByIdQueryHandler implements IQueryHandler<TaskByIdQuery> {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,

    private readonly redisService: RedisService,
  ) {}

  @Cache({
    key: args => `entity:task:${args[0].id}`,
    ttl: 300,
  })
  async execute(query: TaskByIdQuery): Promise<TaskReadModel> {
    const project = await this.projectService.queryProjectByTaskId({
      taskId: query.id,
    });
    const task = await this.taskService.queryTaskById({
      id: query.id,
      project: project,
      reqUserId: query.userId,
    });

    return TaskApplicationMapper.entityToTaskReadModel(task);
  }
}
