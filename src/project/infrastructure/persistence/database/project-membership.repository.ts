import {
  BaseRepository,
  PrismaService,
  TransactionContext,
} from '@libs/database';
import { Injectable } from '@nestjs/common';
import {
  findByUserIdAndProjectIdArgs,
  IProjectMembershipRepository,
} from '@project/application/port/out/project-membership-repository.port';
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

  async findProjectMembershipByUserIdAndProjectId(
    args: findByUserIdAndProjectIdArgs,
  ): Promise<ProjectMembership | null> {
    const client = this.getPrismaClient();
    const record = await client.projectMembership.findFirst({
      where: {
        userId: args.userId,
        projectId: args.projectId,
      },
    });

    if (!record) {
      return null;
    }

    return ProjectMembershipInfraMapper.projectMembershipToDomain(record);
  }
}
