import { DomainException, ErrorCode } from '@libs/exception';

import {
  BaseEntity,
  BaseEntityProps,
} from '@project/domain/entity/abstract/base-entity.abstract.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

type ProjectMembershipImmutableProps = {
  projectId: string;
  userId: string;
};

type ProjectMembershipMutableProps = {
  role: MembershipRole;
};

type ProjectMembershipProps = ProjectMembershipImmutableProps &
  ProjectMembershipMutableProps &
  BaseEntityProps;

export type CreateProjectMembershipProps = Omit<
  ProjectMembershipProps,
  'id' | 'updatedAt' | 'createdAt'
>;

/**
 * ProjectMembership domain entity
 *
 * @remarks
 * Represents a user'membership in a project with a specific role
 *
 * Main responsibility:
 * - Manage the relationship between User and Project
 * - Define user's role-based permissions (OWNER, MEMBER, etc.)
 * - Enforce role change business rules
 *
 */
export class ProjectMembership extends BaseEntity<ProjectMembershipProps> {
  private readonly _projectId: string;

  private readonly _userId: string;

  private _role: MembershipRole;
  private constructor(props: ProjectMembershipProps) {
    super(props);

    this._projectId = props.projectId;
    this._userId = props.userId;
    this._role = props.role;
  }

  // ─────────────────────────────────────
  // getter
  // ─────────────────────────────────────
  get projectId(): string {
    return this._projectId;
  }

  get userId(): string {
    return this._userId;
  }

  get role(): MembershipRole {
    return this._role;
  }

  // ─────────────────────────────────────
  // Factory Method
  // ─────────────────────────────────────

  static create(props: CreateProjectMembershipProps): ProjectMembership {
    const id = this.generateUuid();
    const now = this.generateTimestamp();

    return new ProjectMembership({
      id: id,
      userId: props.userId,
      role: props.role,
      createdAt: now,
      updatedAt: now,
      projectId: props.projectId,
    });
  }

  static reconstitute(props: ProjectMembershipProps): ProjectMembership {
    return new ProjectMembership({
      id: props.id,
      userId: props.userId,
      role: props.role,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      projectId: props.projectId,
    });
  }

  /**
   * Change membership role
   *
   * @param {MembershipRole} membershipRole - New role to assign
   * @memberof ProjectMembership
   *
   * @remarks
   * - Validate role before assignment
   * - Updates entity timestamp automatically via updateTimestamp()
   */
  changeRole(membershipRole: MembershipRole): void {
    if (!membershipRole) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._role = membershipRole;
  }
}
