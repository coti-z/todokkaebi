import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisService } from '@libs/redis';

import { ProjectReadModel } from '@project/application/dto/project-read.model';
import { ProjectApplicationMapper } from '@project/application/mapper/project.application.mapper';
import { ProjectsByUserIdQuery } from '@project/application/port/in/query/project/projects-by-userid.query';
import { ProjectService } from '@project/application/service/project.service';

@Injectable()
@QueryHandler(ProjectsByUserIdQuery)
export class ProjectsByUserIdQueryHandler
  implements IQueryHandler<ProjectsByUserIdQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}

  async execute(query: ProjectsByUserIdQuery): Promise<ProjectReadModel[]> {
    try {
      return await this.process(query);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, query.context);
    }
  }
  private async process(query: ProjectsByUserIdQuery) {
    const projects = await this.projectService.queryProjects({
      userId: query.userId,
    });
    return ProjectApplicationMapper.entitiesToProjectReadModels(projects);
  }
}
