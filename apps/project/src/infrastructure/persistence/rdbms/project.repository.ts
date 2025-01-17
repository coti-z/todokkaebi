import { Project } from '@project/domain/entity/project.entity';
import { PrismaService } from '@libs/database';
import { ProjectInfraMapper } from '@project/infrastructure/mapper/project.infrastructure.mapper';
import { IProjectRepository } from '@project/application/port/out/project-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepositoryImpl implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProject(entity: Project): Promise<void> {
    const data = ProjectInfraMapper.createToPersistence(entity);
    await this.prisma.project.create({
      data,
    });
  }

  async findProjectById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!project) {
      return null;
    }

    return ProjectInfraMapper.projectToDomain(project);
  }

  async findProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
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
    await this.prisma.project.delete({
      where: {
        id: entity.id,
      },
    });
  }
}
