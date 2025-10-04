import { ProjectsByUserIdQuery } from '@project/application/port/in/query/project/projects-by-userid.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ProjectService } from '@project/application/service/project.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { ProjectReadModel } from '@project/application/dto/project-read.model';
import { ProjectApplicationMapper } from '@project/application/mapper/project.application.mapper';
import { RedisService } from '@libs/redis';

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
