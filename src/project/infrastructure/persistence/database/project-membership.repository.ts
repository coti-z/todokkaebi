import { BaseRepository, PrismaService, TransactionContext } from '@libs/database/index';
import { PrismaTransactionClient } from '@libs/database/types/client.type';
import { Injectable } from '@nestjs/common';
import { IProjectMembershipRepository } from '@project/application/port/out/project-membership-repository.port';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { ProjectMembershipInfraMapper } from '@project/infrastructure/mapper/project-membership.infrastructure';

@Injectable()
export class ProjectMembershipRepositoryImpl
extends BaseRepository
  implements IProjectMembershipRepository
{

  async storeProjectMembership(entity: ProjectMembership): Promise<void> {
    const client = this.getPrismaClient();
    const data = ProjectMembershipInfraMapper.toPersistence(entity);
    await client.projectMembership.create({
      data,
    });
  }
}
