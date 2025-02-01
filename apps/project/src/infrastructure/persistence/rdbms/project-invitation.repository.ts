import { PrismaService } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { IProjectInvitationRepository } from '@project/application/port/project-invitation-repository.port';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationInfraMapper } from '@project/infrastructure/mapper/project-invitation.infrastructure.mapper';

@Injectable()
export class ProjectInvitationRepositoryImpl
  implements IProjectInvitationRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async storeProjectInvitation(entity: ProjectInvitation): Promise<void> {
    const data = ProjectInvitationInfraMapper.toPersistence(entity);
    await this.prisma.projectInvitation.create({
      data,
    });
  }
}
