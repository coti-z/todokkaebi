import { MembershipRole } from '../value-objects/membership-role.vo';
import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';
import { DomainException, ErrorCode } from '@libs/exception';

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

type CreateProjectMembershipProps = Omit<
  ProjectMembershipProps,
  'id' | 'updatedAt' | 'createdAt'
>;

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

  get projectId(): string {
    return this._projectId;
  }

  get userId() {
    return this._userId;
  }

  get role() {
    return this._role;
  }

  changeRole(membershipRole: MembershipRole) {
    if (!membershipRole) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._role = membershipRole;
  }

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
}
