import { ProjectReadModel } from '@project/application/dto/project-read.model';
import { CategoryApplicationMapper } from '@project/application/mapper/category.application.mapper';
import { ProjectInvitationApplicationMapper } from '@project/application/mapper/project-invitation.application.mapper';
import { ProjectMembershipApplicationMapper } from '@project/application/mapper/project-membership.application.mapper';
import { Project } from '@project/domain/entity/project.entity';

export class ProjectApplicationMapper {
  static entitiesToProjectReadModels(entities: Project[]): ProjectReadModel[] {
    return entities.map(project => this.entityToProjectReadModel(project));
  }

  static entityToProjectReadModel(entity: Project): ProjectReadModel {
    return {
      id: entity.id,
      name: entity.name,
      adminId: entity.adminId,
      categories: CategoryApplicationMapper.entityToCategoryReadModels(
        entity.categories,
      ),
      projectInvitations:
        ProjectInvitationApplicationMapper.entitiesToProjectInvitationReadModels(
          entity.projectInvitations,
        ),
      projectMemberships:
        ProjectMembershipApplicationMapper.entitiesToProjectMembershipReadModels(
          entity.projectMemberships,
        ),
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
