import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

export enum MembershipRoleRecord {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

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
    [MembershipRole.MEMBER]: MembershipRoleRecord.MEMBER,
    [MembershipRole.OWNER]: MembershipRoleRecord.OWNER,
  };

  static toPersistence(entity: ProjectMembership): ProjectMembershipRecord {
    const mappedState = ProjectMembershipInfraMapper.STATE_MAPPING[entity.role];

    if (mappedState) {
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
}
