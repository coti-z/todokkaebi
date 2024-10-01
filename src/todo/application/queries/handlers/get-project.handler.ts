import { GetProjectQuery } from '@/todo/application/queries/get-project.query';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { ProjectResponse } from '@/todo/presentation/resolvers/dto/objects/project.response';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(private readonly projectService: ProjectService) {}
  async execute(query: GetProjectQuery): Promise<ProjectResponse> {
    try {
      const project = await this.projectService.getProjectWithId(query.id);
      return {
        success: true,
        project,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
