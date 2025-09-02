import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ProjectByIdQuery } from '@project/application/query/project-by-id.query';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';
import { ErrorHandlingStrategy } from '@libs/exception';

@Injectable()
@QueryHandler(ProjectByIdQuery)
export class ProjectByIdQueryHandler
  implements IQueryHandler<ProjectByIdQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}

  async execute(query: ProjectByIdQuery): Promise<Project> {
    try {
      return await this.projectService.queryProject({
        id: query.projectId,
        userId: query.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, query.context);
    }
  }
}
