export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class ProjectInvitationReadModel {
  id: string;

  projectId: string;

  inviterUserId: string;

  inviteeUserId: string;

  status: InvitationStatus;

  createdAt: Date;

  updatedAt: Date;
}
