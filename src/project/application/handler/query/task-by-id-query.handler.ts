import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskByIdQuery } from '../../port/in/query/task/task-by-id.query';
import { TaskService } from '@project/application/service/task.service';
import { ProjectService } from '@project/application/service/project.service';
import { TaskReadModel } from '@project/application/dto/task-read.model';
import { TaskApplicationMapper } from '@project/application/mapper/task.application.mapper';
import { Cache } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { TaskWorkflowPolicy } from '@project/domain/logic/task-management/task-workflow.policy';

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
    await this.authorize(query.id, query.userId);
    return await this.process(query);
  }
  private async authorize(taskId: string, reqUserId: string): Promise<void> {
    const project = await this.projectService.queryProjectByTaskId({
      taskId,
    });
    TaskWorkflowPolicy.canQuery(project, reqUserId);
  }

  private async process(query: TaskByIdQuery): Promise<TaskReadModel> {
    return await this.taskService.queryTaskById({
      id: query.id,
    });
  }
}
