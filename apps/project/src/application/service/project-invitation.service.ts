import { Inject, Injectable } from '@nestjs/common';
import {
  type CreateProjectInvitationParams,
  type UpdateProjectInvitationParams,
} from '@project/application/param/project-invitation.params';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationLogic } from '@project/domain/logic/project-invitation.logic';
import {
  IProjectInvitationRepository,
  ProjectInvitationRepositorySymbol,
} from '../port/project-invitation-repository.port';
import { ErrorCode, errorFactory } from '@libs/exception';

@Injectable()
export class ProjectInvitationService {
  constructor(
    @Inject(ProjectInvitationRepositorySymbol)
    private readonly projectInvitationRepo: IProjectInvitationRepository,
  ) {}

  async createProjectInvitation(
    params: CreateProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    ProjectInvitationLogic.canProjectInvitation(
      params.project,
      params.inviterUserId,
    );
    const projectInvitation = ProjectInvitation.create(params);
    await this.projectInvitationRepo.storeProjectInvitation(projectInvitation);
    return projectInvitation;
  }

  async updateProjectInvitation(
    params: UpdateProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    const projectInvitation =
      await this.projectInvitationRepo.findProjectInvitationById(params.id);

    if (!projectInvitation) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }

    ProjectInvitationLogic.updateProjectInviationStatus(
      projectInvitation,
      params.status,
      params.reqUserId,
    );
    await this.projectInvitationRepo.updateProjectInvitation(projectInvitation);

    return projectInvitation;
  }
}
