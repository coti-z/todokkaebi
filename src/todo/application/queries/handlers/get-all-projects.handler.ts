import { GetAllProjectsQuery } from '@/todo/application/queries/get-all-projects.query';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { GetAllProjectsResponse } from '@/todo/presentation/resolvers/dto/objects/get-all-projects.object';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllProjectsQuery)
@Injectable()
export class GetAllProjectsHandler implements IQueryHandler {
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: GetAllProjectsQuery): Promise<GetAllProjectsResponse> {
    try {
      const projects = await this.projectService.getProjectsWithUserId(
        command.userId,
      );
      return {
        success: true,
        totalNumber: projects.length,
        projects,
      };
    } catch (e) {
      throw e;
    }
  }
}
