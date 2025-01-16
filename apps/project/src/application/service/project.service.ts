import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectParam } from '../param/create-project.param';
import {
  IProjectRepository,
  ProjectRepositorySymbol,
} from '@project/application/port/out/project-repository.port';
import { Project } from '@project/domain/entity/project.entity';
import { DeleteProjectParam } from '@project/application/param/delete-project.param';
import { ErrorCode, errorFactory } from '@libs/exception';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepositorySymbol)
    private readonly projectRepo: IProjectRepository,
  ) {}
  async createProject(params: CreateProjectParam): Promise<Project> {
    const project = Project.create({
      name: params.name,
      adminId: params.userId,
    });
    await this.projectRepo.createProject(project);
    return project;
  }
  async deleteProject(params: DeleteProjectParam): Promise<Project> {
    const project = await this.projectRepo.findProjectById(params.projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== params.userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    await this.projectRepo.deleteProject(project);

    return project;
  }
}
