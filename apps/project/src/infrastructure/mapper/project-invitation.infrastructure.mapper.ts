import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

export enum InvitationStatusRecord {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
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
    [InvitationStatus.ACCEPTED]: InvitationStatusRecord.ACCEPTED,
    [InvitationStatus.PENDING]: InvitationStatusRecord.PENDING,
    [InvitationStatus.REJECTED]: InvitationStatusRecord.REJECTED,
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
}
