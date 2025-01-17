import { v4 as uuidv4 } from 'uuid';
import { MembershipRole } from '../value-objects/membership-role.vo';

type ProjectMembershipImmutableProps = {
  readonly id: string;
  readonly projectId: string;
};

type ProjectMembershipMutableProps = {
  userId: string;
  role: MembershipRole;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectMembershipProps = ProjectMembershipMutableProps &
  ProjectMembershipImmutableProps;

type CreateProjectMembershipProps = Omit<
  ProjectMembershipProps,
  'id' | 'updatedAt' | 'createdAt'
>;

export class ProjectMembership {
  constructor(private readonly props: ProjectMembershipProps) {}

  get id(): string {
    return this.props.id;
  }
  get projectId() {
    return this.props.projectId;
  }

  get userId() {
    return this.props.userId;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CreateProjectMembershipProps): ProjectMembership {
    const id = uuidv4();
    const now = new Date();

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
