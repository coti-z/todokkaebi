import { PrismaService } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IProjectMembershipRepository } from '@project/application/port/out/project-membership-repository.port';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { ProjectMembershipInfraMapper } from '@project/infrastructure/mapper/project-membership.infrastructure';

@Injectable()
export class ProjectMembershipRepositoryImpl
  implements IProjectMembershipRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async storeProjectMembership(entity: ProjectMembership): Promise<void> {
    const data = ProjectMembershipInfraMapper.toPersistence(entity);
    const record = await this.prisma.projectMembership.create({
      data,
    });
    record.role;
  }
}
