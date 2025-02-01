import { Inject, Injectable } from '@nestjs/common';
import {
  IProjectInvitationRepository,
  ProjectInvitationRepositorySymbol,
} from '../port/project-invitation-repository.port';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationParams } from '@project/application/param/project-invitation.params';
import { ProjectInvitationLogic } from '@project/domain/logic/project-invitation.logic';

@Injectable()
export class ProjectInvitationService {
  constructor(
    @Inject(ProjectInvitationRepositorySymbol)
    private readonly projectInvitationRepo: IProjectInvitationRepository,
  ) {}

  async createProjectInvitation(
    params: ProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    ProjectInvitationLogic.canProjectInvitation(
      params.project,
      params.inviterUserId,
    );
    const projectInvitation = ProjectInvitation.create(params);
    await this.projectInvitationRepo.storeProjectInvitation(projectInvitation);
    return projectInvitation;
  }
}
