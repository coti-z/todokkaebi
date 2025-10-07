import { Project } from '@project/domain/entity/project.entity';
import {
  CategoryInfraMapper,
  CategoryRecord,
} from '@project/infrastructure/mapper/category.infrastructure.mapper';
import {
  ProjectInvitationInfraMapper,
  ProjectInvitationRecord,
} from '@project/infrastructure/mapper/project-invitation.infrastructure.mapper';
import {
  ProjectMembershipInfraMapper,
  ProjectMembershipRecord,
} from '@project/infrastructure/mapper/project-membership.infrastructure';

export interface ProjectRecord {
  id: string;
  name: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
  categories?: CategoryRecord[];
  projectInvitations?: ProjectInvitationRecord[];
  memberships?: ProjectMembershipRecord[];
}

type CreateProjectRecord = Omit<
  ProjectRecord,
  'categories' | 'projectInvitations' | 'memberships'
>;

type UpdateProjectRecord = Partial<CreateProjectRecord> &
  Required<Pick<CreateProjectRecord, 'id'>>;

export class ProjectInfraMapper {
  static createToPersistence(entity: Project): CreateProjectRecord {
    return {
      id: entity.id,
      name: entity.name,
      adminId: entity.adminId,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }

  static updateToPersistence(entity: Project): UpdateProjectRecord {
    return {
      id: entity.id,
      name: entity.name,
      adminId: entity.adminId,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }

  static projectToDomain(record: ProjectRecord): Project {
    const invitation = record.projectInvitations
      ? ProjectInvitationInfraMapper.projectInvitationsToDomain(
          record.projectInvitations,
        )
      : [];

    const categories = record.categories
      ? CategoryInfraMapper.categoriesToDomain(record.categories)
      : [];
    const memberships = record.memberships
      ? ProjectMembershipInfraMapper.projectMembershipsToDomain(
          record.memberships,
        )
      : [];
    return Project.reconstitute({
      id: record.id,
      name: record.name,
      adminId: record.adminId,
      updatedAt: record.updatedAt,
      createdAt: record.createdAt,
      projectInvitations: invitation,
      categories: categories,
      memberships: memberships,
    });
  }

  static projectsToDomain(records: ProjectRecord[]): Project[] {
    return records.map(record => this.projectToDomain(record));
  }
}
