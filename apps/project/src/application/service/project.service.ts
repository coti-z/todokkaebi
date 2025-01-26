import { ErrorCode, errorFactory } from '@libs/exception';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProjectParams,
  DeleteProjectParams,
  QueryProjectByTaskIdParams,
  QueryProjectParams,
  QueryProjectsByUserIdParams,
  UpdateProjectParams,
  ValidateOwnerByCategoryIdParams,
} from '@project/application/param/project.params';
import {
  IProjectRepository,
  ProjectRepositorySymbol,
} from '@project/application/port/out/project-repository.port';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectPolicyLogic } from '@project/domain/logic/project-policy.logic';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepositorySymbol)
    private readonly projectRepo: IProjectRepository,
  ) {}

  async createProject(param: CreateProjectParams): Promise<Project> {
    const project = Project.create({
      name: param.name,
      adminId: param.adminId,
    });
    await this.projectRepo.createProject(project);
    return project;
  }

  async deleteProject(param: DeleteProjectParams): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== param.adminId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    await this.projectRepo.deleteProject(project);

    return project;
  }

  async updateProject(param: UpdateProjectParams): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (param.name) {
      ProjectPolicyLogic.changeProjectName(project, param.adminId, param.name);
    }

    await this.projectRepo.updateProject(project);
    return project;
  }

  async queryProject(param: QueryProjectParams): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return project;
  }
  async queryProjects(param: QueryProjectsByUserIdParams): Promise<Project[]> {
    return await this.projectRepo.findProjectsByUserId(param.userId);
  }

  async queryProjectByCategoryId(
    params: QueryProjectByTaskIdParams,
  ): Promise<Project> {
    const project = await this.projectRepo.findProjectByCategoryId(
      params.categoryId,
    );
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return project;
  }

  async isProjectOwnerByTaskId(
    params: ValidateOwnerByCategoryIdParams,
  ): Promise<void> {
    const project = await this.projectRepo.findProjectByCategoryId(params.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== params.reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
