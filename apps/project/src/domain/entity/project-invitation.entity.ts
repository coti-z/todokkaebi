import { InvitationStatus } from '../value-objects/invation-status.vo';
import { v4 as uuidv4 } from 'uuid';

interface ProjectInvitationProps {
  projectId: string;
  inviterUserId: string;
  inviteeUserId: string;
  status: InvitationStatus;
}
export class ProjectInvitation {
  private constructor(
    public readonly id: string,
    private _projectId: string,
    private _inviterUserId: string,
    private _inviteeUserId: string,
    private _status: InvitationStatus,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get projectId() {
    return this._projectId;
  }

  get inviterUserId() {
    return this._inviterUserId;
  }

  get inviteeUserId() {
    return this._inviteeUserId;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static create(props: ProjectInvitationProps): ProjectInvitation {
    const id = uuidv4();
    const now = new Date();
    return new ProjectInvitation(
      id,
      props.projectId,
      props.inviterUserId,
      props.inviteeUserId,
      props.status,
      now,
      now,
    );
  }
}
