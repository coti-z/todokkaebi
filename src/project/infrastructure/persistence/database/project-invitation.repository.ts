import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@libs/database';

import { IProjectInvitationRepository } from '@project/application/port/out/project-invitation-repository.port';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationInfraMapper } from '@project/infrastructure/mapper/project-invitation.infrastructure.mapper';

@Injectable()
export class ProjectInvitationRepositoryImpl
  extends BaseRepository
  implements IProjectInvitationRepository
{
  async storeProjectInvitation(entity: ProjectInvitation): Promise<void> {
    const client = this.getPrismaClient();
    const data = ProjectInvitationInfraMapper.toPersistence(entity);
    await client.projectInvitation.create({
      data: data,
    });
  }

  async updateProjectInvitation(entity: ProjectInvitation): Promise<void> {
    const client = this.getPrismaClient();
    const data = ProjectInvitationInfraMapper.toPersistence(entity);
    await client.projectInvitation.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findProjectInvitationById(
    projectInvitationId: string,
  ): Promise<ProjectInvitation | null> {
    const client = this.getPrismaClient();
    const record = await client.projectInvitation.findUnique({
      where: {
        id: projectInvitationId,
      },
    });

    if (!record) {
      return null;
    }

    return ProjectInvitationInfraMapper.projectInvitationToDomain({
      createdAt: record.createdAt,
      id: record.id,
      inviteeUserId: record.inviteeUserId,
      inviterUserId: record.inviterUserId,
      projectId: record.projectId,
      projectInvitationStatus: record.projectInvitationStatus,
      updatedAt: record.updatedAt,
    });
  }
}
