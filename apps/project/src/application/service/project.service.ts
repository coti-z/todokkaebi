import { Inject, Injectable } from '@nestjs/common';
import {
  IProjectRepository,
  ProjectRepositorySymbol,
} from '@project/application/port/out/project-repository.port';
import { Project } from '@project/domain/entity/project.entity';
import { ErrorCode, errorFactory } from '@libs/exception';
import {
  CreateProjectParam,
  DeleteProjectParam,
  QueryProjectParam,
  QueryProjectsParam,
  UpdateProjectParam,
} from '@project/application/param/project.params';
import { ProjectPolicyLogic } from '@project/domain/logic/project-policy.logic';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepositorySymbol)
    private readonly projectRepo: IProjectRepository,
  ) {}

  async createProject(param: CreateProjectParam): Promise<Project> {
    const project = Project.create({
      name: param.name,
      adminId: param.userId,
    });
    await this.projectRepo.createProject(project);
    return project;
  }

  async deleteProject(param: DeleteProjectParam): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== param.userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    await this.projectRepo.deleteProject(project);

    return project;
  }

  async updateProject(param: UpdateProjectParam): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (param.name) {
      ProjectPolicyLogic.changeProjectName(project, param.userId, param.name);
    }

    await this.projectRepo.updateProject(project);
    return project;
  }

  async queryProject(param: QueryProjectParam): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return project;
  }
  async queryProjects(param: QueryProjectsParam): Promise<Project[]> {
    return await this.projectRepo.findProjectsByUserId(param.userId);
  }
}
