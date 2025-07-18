import { Inject, Injectable } from '@nestjs/common';
import {
  AcceptProjectInvitationParams,
  RejectProjectInvitationParams,
  type CreateProjectInvitationParams,
  type UpdateProjectInvitationParams,
} from '@project/application/param/project-invitation.params';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationLogic } from '@project/domain/logic/project-invitation.logic';
import {
  IProjectInvitationRepository,
  ProjectInvitationRepositorySymbol,
} from '../port/out/project-invitation-repository.port';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';
import { ApplicationException, ErrorCode } from '@libs/exception';

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
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    ProjectInvitationLogic.updateProjectInviationStatus(
      projectInvitation,
      params.status,
      params.reqUserId,
    );
    await this.projectInvitationRepo.updateProjectInvitation(projectInvitation);
    return projectInvitation;
  }

  async acceptProjectInvitation(
    params: AcceptProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    const projectInvitation =
      await this.projectInvitationRepo.findProjectInvitationById(params.id);
    if (!projectInvitation) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    ProjectInvitationLogic.acceptProjectInvitation(
      projectInvitation,
      InvitationStatus.ACCEPTED,
      params.reqUserId,
    );
    await this.projectInvitationRepo.updateProjectInvitation(projectInvitation);
    return projectInvitation;
  }

  async rejectProjectInvitation(
    params: RejectProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    const projectInvitation =
      await this.projectInvitationRepo.findProjectInvitationById(params.id);

    if (!projectInvitation) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    ProjectInvitationLogic.rejectProjectInvitation(
      projectInvitation,
      InvitationStatus.REJECTED,
      params.reqUserId,
    );
    await this.projectInvitationRepo.updateProjectInvitation(projectInvitation);
    return projectInvitation;
  }
}
