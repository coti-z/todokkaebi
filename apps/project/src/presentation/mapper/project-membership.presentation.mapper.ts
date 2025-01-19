import { ProjectMembershipType } from '@project/presentation/resolver/type/project-membership.type';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export class ProjectMembershipPresentationMapper {
  static entityToObjectType(entity: ProjectMembership): ProjectMembershipType {
    return {
      projectId: entity.projectId,
      id: entity.id,
      role: entity.role,
      createdAt: entity.createdAt,
      userId: entity.userId,
      updatedAt: entity.updatedAt,
    };
  }

  static entitiesToObjectType(
    entities: ProjectMembership[],
  ): ProjectMembershipType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }
}
