import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ProjectByIdQuery } from '@project/application/query/project-by-id.query';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';

@Injectable()
@QueryHandler(ProjectByIdQuery)
export class ProjectByIdQueryHandler
  implements IQueryHandler<ProjectByIdQuery>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: ProjectByIdQuery): Promise<Project> {
    return await this.projectService.queryProject({
      projectId: query.projectId,
    });
  }
}
