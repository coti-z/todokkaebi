import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';

export class ProjectInvitationPresentationMapper {
  static entityToObjectType(entity: ProjectInvitation): ProjectInvitationType {
    return {
      updatedAt: entity.updatedAt,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      inviterUserId: entity.inviterUserId,
      status: entity.status,
      inviteeUserId: entity.inviteeUserId,
      id: entity.id,
    };
  }

  static entitiesToObjectType(
    entities: ProjectInvitation[],
  ): ProjectInvitationType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }
}
