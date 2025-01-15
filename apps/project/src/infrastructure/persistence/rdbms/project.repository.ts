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
}
