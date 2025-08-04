import { Project } from '@project/domain/entity/project.entity';
import { ProjectInfraMapper } from '@project/infrastructure/mapper/project.infrastructure.mapper';
import { IProjectRepository } from '@project/application/port/out/project-repository.port';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@libs/database';

@Injectable()
export class ProjectRepositoryImpl
  extends BaseRepository
  implements IProjectRepository
{
  async createProject(entity: Project): Promise<void> {
    const client = this.getPrismaClient();
    const data = ProjectInfraMapper.createToPersistence(entity);
    await client.project.create({
      data,
    });
  }

  async findProjectById(id: string): Promise<Project | null> {
    const client = this.getPrismaClient();
    const project = await client.project.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: {
          include: {
            tasks: true,
          },
        },
        memberships: true,
        projectInvitations: true,
      },
    });

    if (!project) {
      return null;
    }

    return ProjectInfraMapper.projectToDomain({
      adminId: project.adminId,
      createdAt: project.createdAt,
      id: project.id,
      name: project.name,
      updatedAt: project.updatedAt,
      categories: project.categories,
      memberships: project.memberships,
      projectInvitations: project.projectInvitations,
    });
  }

  async findProjectsByUserId(userId: string): Promise<Project[]> {
    const client = this.getPrismaClient();
    const projects = await client.project.findMany({
      where: {
        OR: [
          { adminId: userId },
          {
            memberships: { some: { userId: userId } },
          },
        ],
      },
    });

    return ProjectInfraMapper.projectsToDomain(projects);
  }
  async deleteProject(entity: Project): Promise<void> {
    const client = this.getPrismaClient();

    await client.project.delete({
      where: {
        id: entity.id,
      },
    });
  }
  async updateProject(entity: Project): Promise<void> {
    const client = this.getPrismaClient();
    const data = ProjectInfraMapper.updateToPersistence(entity);
    await client.project.update({
      where: {
        id: entity.id,
      },
      data,
    });
  }

  async findProjectByCategoryId(categoryId: string): Promise<Project | null> {
    const client = this.getPrismaClient();
    const record = await client.project.findFirst({
      where: {
        categories: {
          some: { id: categoryId },
        },
      },
      include: {
        categories: {
          include: {
            tasks: true,
          },
        },
      },
    });
    if (!record) {
      return null;
    }

    return ProjectInfraMapper.projectToDomain(record);
  }

  async findProjectByTaskId(taskId: string): Promise<Project | null> {
    const client = this.getPrismaClient();
    const record = await client.project.findFirst({
      where: {
        categories: {
          some: {
            tasks: {
              some: {
                id: taskId,
              },
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!record) {
      return null;
    }

    return ProjectInfraMapper.projectToDomain(record);
  }
}
