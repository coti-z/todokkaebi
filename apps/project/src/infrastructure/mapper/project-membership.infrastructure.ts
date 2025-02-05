import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

export type MembershipRoleRecord = 'OWNER' | 'MEMBER';

export interface ProjectMembershipRecord {
  id: string;
  projectId: string;
  userId: string;
  role: MembershipRoleRecord;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectMembershipInfraMapper {
  private static readonly STATE_MAPPING: Record<
    MembershipRole,
    MembershipRoleRecord
  > = {
    [MembershipRole.MEMBER]: 'MEMBER',
    [MembershipRole.OWNER]: 'OWNER',
  };
  private static readonly STATE_MAPPING_TO_DOMAIN: Record<
    MembershipRoleRecord,
    MembershipRole
  > = {
    MEMBER: MembershipRole.MEMBER,
    OWNER: MembershipRole.OWNER,
  };

  static toPersistence(entity: ProjectMembership): ProjectMembershipRecord {
    const mappedState = ProjectMembershipInfraMapper.STATE_MAPPING[entity.role];

    if (!mappedState) {
      throw new Error(`Unknown state ${entity.role}`);
    }
    return {
      id: entity.id,
      userId: entity.userId,
      role: mappedState,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static projectMembershipsToPersistence(
    entities: ProjectMembership[],
  ): ProjectMembershipRecord[] {
    return entities.map(projectMembership =>
      this.toPersistence(projectMembership),
    );
  }

  static projectMembershipToDomain(
    record: ProjectMembershipRecord,
  ): ProjectMembership {
    const mappedState =
      ProjectMembershipInfraMapper.STATE_MAPPING_TO_DOMAIN[record.role];
    if (mappedState) {
      throw new Error(`Unknown state ${record.role}`);
    }
    return ProjectMembership.reconstitute({
      id: record.id,
      userId: record.userId,
      role: mappedState,
      projectId: record.projectId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static projectMembershipsToDomain(
    records: ProjectMembershipRecord[],
  ): ProjectMembership[] {
    return records.map(record => this.projectMembershipToDomain(record));
  }
}
