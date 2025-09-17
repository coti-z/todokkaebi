import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ProjectByIdQuery } from '@project/application/port/in/query/project/project-by-id.query';
import { ProjectService } from '@project/application/service/project.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { ProjectReadModel } from '@project/application/dto/project-read.model';
import { ProjectApplicationMapper } from '@project/application/mapper/project.application.mapper';
import { Cache } from '@libs/decorators';
import { RedisService } from '@libs/redis';

@Injectable()
@QueryHandler(ProjectByIdQuery)
export class ProjectByIdQueryHandler
  implements IQueryHandler<ProjectByIdQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    private readonly redisService: RedisService,
  ) {}

  @Cache({
    key: args => `entity:project:${args[0].projectId}`,
    ttl: 300,
  })
  async execute(query: ProjectByIdQuery): Promise<ProjectReadModel> {
    try {
      const project = await this.projectService.queryProject({
        id: query.projectId,
        userId: query.userId,
      });

      return ProjectApplicationMapper.entityToProjectReadModel(project);
    } catch (error) {
      console.log(error);
      this.errorHandlingStrategy.handleError(error, query.context);
    }
  }
}
