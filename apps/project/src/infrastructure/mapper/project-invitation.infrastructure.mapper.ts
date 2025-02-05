import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

export type InvitationStatusRecord = 'PENDING' | 'ACCEPTED' | 'REJECTED';
export interface ProjectInvitationRecord {
  id: string;
  projectId: string;
  inviterUserId: string;
  inviteeUserId: string;
  status: InvitationStatusRecord;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectInvitationInfraMapper {
  private static readonly STATE_MAPPING: Record<
    InvitationStatus,
    InvitationStatusRecord
  > = {
    [InvitationStatus.ACCEPTED]: 'ACCEPTED',
    [InvitationStatus.PENDING]: 'PENDING',
    [InvitationStatus.REJECTED]: 'REJECTED',
  };

  private static readonly STATE_MAPPING_TO_DOMAIN: Record<
    InvitationStatusRecord,
    InvitationStatus
  > = {
    ACCEPTED: InvitationStatus.ACCEPTED,
    PENDING: InvitationStatus.PENDING,
    REJECTED: InvitationStatus.REJECTED,
  };
  static toPersistence(entity: ProjectInvitation): ProjectInvitationRecord {
    const mappedState =
      ProjectInvitationInfraMapper.STATE_MAPPING[entity.status];
    if (!mappedState) {
      throw new Error(`Unknown state ${entity.status}`);
    }
    return {
      id: entity.id,
      inviteeUserId: entity.inviteeUserId,
      inviterUserId: entity.inviterUserId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      projectId: entity.projectId,
      status: mappedState,
    };
  }
  static projectInvitationsToPersistence(
    entities: ProjectInvitation[],
  ): ProjectInvitationRecord[] {
    return entities.map(projectInvitation =>
      this.toPersistence(projectInvitation),
    );
  }
  static projectInvitationToDomain(
    record: ProjectInvitationRecord,
  ): ProjectInvitation {
    const mappedState =
      ProjectInvitationInfraMapper.STATE_MAPPING_TO_DOMAIN[record.status];
    if (!mappedState) {
      throw new Error(`Unknown state ${record.status}`);
    }
    return ProjectInvitation.reconstitute({
      id: record.id,
      inviteeUserId: record.inviteeUserId,
      inviterUserId: record.inviterUserId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      projectId: record.projectId,
      status: mappedState,
    });
  }

  static projectInvitationsToDomain(
    records: ProjectInvitationRecord[],
  ): ProjectInvitation[] {
    return records.map(record => this.projectInvitationToDomain(record));
  }
}
