import { GetAllProjectsQuery } from '@/todo/application/queries/get-all-projects.query';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { GetAllProjectsResponse } from '@/todo/presentation/resolvers/dto/objects/get-all-projects.object';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(GetAllProjectsQuery)
export class GetAllProjectHandler
  implements IQueryHandler<GetAllProjectsQuery>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(query: GetAllProjectsQuery): Promise<GetAllProjectsResponse> {
    try {
      const projects = await this.projectService.getProjectsWithUserId(
        query.userId,
      );
      return {
        success: true,
        total: projects.length,
        projects: projects,
      };
    } catch (e) {
      throw e;
    }
  }
}
