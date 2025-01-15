import { v4 as uuidv4 } from 'uuid';
import { MembershipRole } from '../value-objects/membership-role.vo';

interface ProjectMembershipProps {
  projectId: string;
  userId: string;
  role: MembershipRole;
}

export class ProjectMembership {
  constructor(
    public readonly id: string,
    private _projectId: string,
    private _userId: string,
    private _role: MembershipRole,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get projectId() {
    return this._projectId;
  }

  get userId() {
    return this._userId;
  }

  get role() {
    return this._role;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static create(props: ProjectMembershipProps): ProjectMembership {
    const id = uuidv4();
    const now = new Date();

    return new ProjectMembership(
      id,
      props.projectId,
      props.userId,
      props.role,
      now,
      now,
    );
  }
}
