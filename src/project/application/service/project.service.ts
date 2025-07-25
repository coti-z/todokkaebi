import { ApplicationException, ErrorCode } from '@libs/exception';
import { TransactionContext } from '@libs/database';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProjectParams,
  DeleteProjectParams,
  QueryProjectByCategoryIdParams,
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
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== param.adminId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    await this.projectRepo.deleteProject(project);

    return project;
  }

  async updateProject(param: UpdateProjectParams): Promise<Project> {
    const project = await this.projectRepo.findProjectById(param.id);
    if (!project) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
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
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    return project;
  }
  async queryProjects(param: QueryProjectsByUserIdParams): Promise<Project[]> {
    return await this.projectRepo.findProjectsByUserId(param.userId);
  }

  async queryProjectByCategoryId(
    params: QueryProjectByCategoryIdParams,
  ): Promise<Project> {
    const project = await this.projectRepo.findProjectByCategoryId(
      params.categoryId,
    );
    if (!project) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    return project;
  }

  async queryProjectByTaskId(
    params: QueryProjectByTaskIdParams,
  ): Promise<Project> {
    const project = await this.projectRepo.findProjectByTaskId(params.taskId);
    if (!project) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    return project;
  }

  async isProjectOwnerByCategoryId(
    params: ValidateOwnerByCategoryIdParams,
  ): Promise<void> {
    const project = await this.projectRepo.findProjectByCategoryId(params.id);
    if (!project) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    if (project.adminId !== params.reqUserId) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
  }
}
