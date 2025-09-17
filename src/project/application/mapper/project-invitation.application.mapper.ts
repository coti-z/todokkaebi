import { ProjectInvitationReadModel } from '@project/application/dto/project-invitation-read.model';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';

export class ProjectInvitationApplicationMapper {
  static entitiesToProjectInvitationReadModels(
    entities: ProjectInvitation[],
  ): ProjectInvitationReadModel[] {
    return entities.map(projectInvitation =>
      this.entityToProjectInvitationReadModel(projectInvitation),
    );
  }
  static entityToProjectInvitationReadModel(
    entity: ProjectInvitation,
  ): ProjectInvitationReadModel {
    return {
      id: entity.id,
      status: entity.status,
      inviteeUserId: entity.inviteeUserId,
      inviterUserId: entity.inviterUserId,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
