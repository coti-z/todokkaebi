import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectParam } from '../param/create-project.param';
import {
  IProjectRepository,
  ProjectRepositorySymbol,
} from '@project/application/port/out/project-repository.port';
import { Project } from '@project/domain/entity/project.entity';

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
}
