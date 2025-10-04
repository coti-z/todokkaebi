import { Inject, Injectable } from '@nestjs/common';
import {
  type CreateProjectInvitationParams,
  type UpdateProjectInvitationParams,
} from '@project/application/param/project-invitation.params';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import {
  IProjectInvitationRepository,
  ProjectInvitationRepositorySymbol,
} from '../port/out/project-invitation-repository.port';
import { ApplicationException, ErrorCode } from '@libs/exception';
import { FindProjectInvitationByIdParams } from '@project/application/param/find-project-inviation-by-id.param';

@Injectable()
export class ProjectInvitationService {
  constructor(
    @Inject(ProjectInvitationRepositorySymbol)
    private readonly projectInvitationRepo: IProjectInvitationRepository,
  ) {}

  async createProjectInvitation(
    params: CreateProjectInvitationParams,
  ): Promise<ProjectInvitation> {
    const projectInvitation = ProjectInvitation.create({
      inviteeUserId: params.inviteeUserId,
      inviterUserId: params.inviterUserId,
      projectId: params.projectId,
    });
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
    projectInvitation.changeInvitationStatus(params.status);

    await this.projectInvitationRepo.updateProjectInvitation(projectInvitation);
    return projectInvitation;
  }

  async findProjectInvitationById(
    params: FindProjectInvitationByIdParams,
  ): Promise<ProjectInvitation> {
    const projectInvitation =
      await this.projectInvitationRepo.findProjectInvitationById(params.id);
    if (!projectInvitation) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    return projectInvitation;
  }
}
