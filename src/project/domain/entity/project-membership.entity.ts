import { v4 as uuidv4 } from 'uuid';
import { MembershipRole } from '../value-objects/membership-role.vo';
import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';

type ProjectMembershipImmutableProps = {
  projectId: string;
};

type ProjectMembershipMutableProps = {
  userId: string;
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
  get projectId() {
    return this.props.projectId;
  }

  get userId() {
    return this.props.userId;
  }

  get role() {
    return this.props.role;
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
  update(partialProps: Partial<ProjectMembershipMutableProps>): void {
    Object.assign(this.props, partialProps);
    this.updateTimestamp();
  }
}
