import { DomainException, ErrorCode } from '@libs/exception';

import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';

type ProjectInvitationImmutableProps = {
  readonly projectId: string;
  readonly inviterUserId: string;
  readonly inviteeUserId: string;
};

type ProjectInvitationMutableProps = {
  status: InvitationStatus;
};

type ProjectInvitationProps = ProjectInvitationImmutableProps &
  ProjectInvitationMutableProps &
  BaseEntityProps;

export type CreateProjectInvitationProps = Omit<
  ProjectInvitationProps,
  'createdAt' | 'updatedAt' | 'id' | 'status'
>;

/**
 * ProjectInvitation domain entity
 * @remarks
 * Represents an invitation for a user to join a project
 * Manages the invitation lifecycle from creation to acceptance/rejection
 *
 */
export class ProjectInvitation extends BaseEntity<ProjectInvitationProps> {
  private readonly _projectId: string;
  private readonly _inviterUserId: string;
  private readonly _inviteeUserId: string;
  private _invitationStatus: InvitationStatus;

  private constructor(props: ProjectInvitationProps) {
    super(props);

    this._projectId = props.projectId;
    this._inviterUserId = props.inviterUserId;
    this._inviteeUserId = props.inviteeUserId;
    this._invitationStatus = props.status;
  }

  // ─────────────────────────────────────
  // Factory Method
  // ─────────────────────────────────────
  static create(props: CreateProjectInvitationProps): ProjectInvitation {
    if (!props) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    if (!props.projectId || !props.inviteeUserId || !props.inviterUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }

    if (props.inviteeUserId === props.inviterUserId) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    const id = this.generateUuid();
    const now = this.generateTimestamp();
    const newStatus = InvitationStatus.PENDING;
    return new ProjectInvitation({
      id: id,
      createdAt: now,
      updatedAt: now,
      projectId: props.projectId,
      status: newStatus,
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

  // ─────────────────────────────────────
  // getter
  // ─────────────────────────────────────

  get projectId(): string {
    return this._projectId;
  }

  get inviterUserId(): string {
    return this._inviterUserId;
  }

  get inviteeUserId(): string {
    return this._inviteeUserId;
  }

  get status(): InvitationStatus {
    return this._invitationStatus;
  }

  /**
   * change invitation status
   *
   * @param {InvitationStatus} invitationStatus
   * @memberof ProjectInvitation
   */
  changeInvitationStatus(invitationStatus: InvitationStatus): void {
    if (!invitationStatus) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._invitationStatus = invitationStatus;
  }
}
