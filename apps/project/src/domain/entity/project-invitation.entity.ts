import { InvitationStatus } from '../value-objects/invation-status.vo';
import { v4 as uuidv4 } from 'uuid';

type ProjectInvitationImmutableProps = {
  readonly id: string;
  readonly projectId: string;
  readonly inviterUserId: string;
  readonly inviteeUserId: string;
  readonly createdAt: Date;
};

type ProjectInvitationMutableProps = {
  status: InvitationStatus;
  updatedAt: Date;
};

type ProjectInvitationProps = ProjectInvitationImmutableProps &
  ProjectInvitationMutableProps;

type CreateProjectInvitationProps = Omit<
  ProjectInvitationProps,
  'createdAt' | 'updatedAt' | 'id'
>;

export class ProjectInvitation {
  private constructor(private readonly props: ProjectInvitationProps) {}

  get id(): string {
    return this.props.id;
  }
  get projectId() {
    return this.props.projectId;
  }

  get inviterUserId() {
    return this.props.inviterUserId;
  }

  get inviteeUserId() {
    return this.props.inviteeUserId;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CreateProjectInvitationProps): ProjectInvitation {
    const id = uuidv4();
    const now = new Date();
    return new ProjectInvitation({
      id: id,
      createdAt: now,
      updatedAt: now,
      projectId: props.projectId,
      status: props.status,
      inviteeUserId: props.inviteeUserId,
      inviterUserId: props.inviterUserId,
    });
  }

  static reconstitute(props: ProjectInvitationProps): ProjectInvitation {
    return new ProjectInvitation({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      projectId: props.projectId,
      status: props.status,
      inviteeUserId: props.inviteeUserId,
      inviterUserId: props.inviterUserId,
    });
  }
}
