import { CreateProjectCommand } from '@/todo/application/commands/create-project.command';
import { DeleteProjectCommand } from '@/todo/application/commands/delete-project.command';
import { UpdateProjectCommand } from '@/todo/application/commands/update-project.command';
import { ProjectModel } from '@/todo/domain/model/project.model';
import { ProjectRepository } from '@/todo/infrastructure/database/repository/project.repository';
import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProjectWithId(id: string): Promise<ProjectModel> {
    const project = await this.projectRepository.getProjectWithId(id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    const projectWithRange = await this.getProjectRange(project);
    return projectWithRange;
  }

  async getProjectsWithUserId(userId: string): Promise<ProjectModel[]> {
    const projects = await this.projectRepository.getProjectsWithUserId(userId);
    const promise = projects.map(project => this.getProjectRange(project));
    return await Promise.all(promise);
  }

  async createProject(cmd: CreateProjectCommand): Promise<ProjectModel> {
    const project = await this.projectRepository.createProject({
      name: cmd.name,
      user: {
        connect: {
          id: cmd.userId,
        },
      },
    });

    return project;
  }

  async updateProject(cmd: UpdateProjectCommand): Promise<ProjectModel> {
    const project = await this.projectRepository.getProjectWithId(cmd.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.userId !== cmd.userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    const project2 = await this.projectRepository.updateProject(cmd.id, {
      ...cmd,
    });

    return project2;
  }

  async deleteProject(cmd: DeleteProjectCommand): Promise<ProjectModel> {
    const project = await this.projectRepository.getProjectWithId(cmd.id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (project.userId !== cmd.userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return await this.projectRepository.deleteProject(cmd.id);
  }

  async getProjectUserId(projectId: string): Promise<string> {
    const project = await this.projectRepository.getProjectWithId(projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return project.userId;
  }

  async validateProjectOwnerWithUserId(
    projectId: string,
    userId: string,
  ): Promise<void> {
    const project = await this.projectRepository.getProjectWithId(projectId);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }

    if (project.userId !== userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
  private async getProjectRange(
    projectModel: ProjectModel,
  ): Promise<ProjectModel> {
    const range = await this.projectRepository.getProjectRange(projectModel.id);
    if (range.startDate) projectModel.startDate = range.startDate;
    if (range.endDate) projectModel.endDate = range.endDate;
    return projectModel;
  }
}
