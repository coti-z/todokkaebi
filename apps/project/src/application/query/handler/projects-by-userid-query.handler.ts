import { ProjectsByUserIdQuery } from '@project/application/query/projects-by-userid.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';

@Injectable()
@QueryHandler(ProjectsByUserIdQuery)
export class ProjectsByUserIdQueryHandler
  implements IQueryHandler<ProjectsByUserIdQuery>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: ProjectsByUserIdQuery): Promise<Project[]> {
    return await this.projectService.queryProjects({
      userId: query.userId,
    });
  }
}
