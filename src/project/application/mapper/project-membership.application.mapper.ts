import { ProjectMembershipReadModel } from '@project/application/dto/project-membership-read.model';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export class ProjectMembershipApplicationMapper {
  static entitiesToProjectMembershipReadModels(
    entities: ProjectMembership[],
  ): ProjectMembershipReadModel[] {
    return entities.map(projectMembership =>
      this.entityToProjectMembershipReadModel(projectMembership),
    );
  }
  static entityToProjectMembershipReadModel(
    entity: ProjectMembership,
  ): ProjectMembershipReadModel {
    return {
      id: entity.id,
      projectId: entity.projectId,
      userId: entity.userId,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
