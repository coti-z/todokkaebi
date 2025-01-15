import { IProjectRepositoryPort } from '@project/application/port/out/project-repository.port';
import { Project } from '@project/domain/entity/project.entity';
import { PrismaService } from '@libs/database';
import { ProjectInfraMapper } from '@project/infrastructure/mapper/project.infrastructure.mapper';

export class ProjectRepository implements IProjectRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async createProject(entity: Project): Promise<void> {
    const data = ProjectInfraMapper.createToPersistence(entity);
    await this.prisma.project.create({
      data,
    });
  }
}
