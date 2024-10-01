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

  async getProjectTimeLine(id: string) {
    const projects = await this.projectRepository.getProjectForTimeline(id);
    if (!projects) {
      throw new Error('Project not found');
    }

    let projectStartDate: Date | null = null;
    let projectEndDate: Date | null = null;
    projects.categories.map(category => {
      const tasks = category.tasks;
      const categoryStartDate =
        tasks.length > 0 ? tasks[0].actualStartDate : null;
      const categoryEndDate =
        tasks.length > 0 ? tasks[tasks.length - 1].actualEndDate : null;

      // Update project start and end dates
      if (
        categoryStartDate &&
        (!projectStartDate || categoryStartDate < projectStartDate)
      ) {
        projectStartDate = categoryStartDate;
      }
      if (
        categoryEndDate &&
        (!projectEndDate || categoryEndDate > projectEndDate)
      ) {
        projectEndDate = categoryEndDate;
      }

      return {
        ...category,
        startDate: categoryStartDate,
        endDate: categoryEndDate,
        tasks: tasks.map(task => ({
          ...task,
          startDate: task.actualStartDate,
          endDate: task.actualEndDate,
        })),
      };
      console.log(projects);
    });
  }

  async getProjectWithId(id: string): Promise<ProjectModel> {
    const project = await this.projectRepository.getProjectWithId(id);
    if (!project) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return project;
  }

  async getProjectsWithUserId(userId: string): Promise<ProjectModel[]> {
    const projects = await this.projectRepository.getProjectsWithUserId(userId);
    return projects;
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
}
