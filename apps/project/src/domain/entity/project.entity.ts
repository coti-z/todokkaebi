import { v4 as uuidv4 } from 'uuid';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { Category } from '@project/domain/entity/category.entity';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';

interface ProjectProps {
  name: string;
  adminId: string;
  memberships?: ProjectMembership[];
  projectInvitations?: ProjectInvitation[];
  categories?: Category[];
}
export class Project {
  private constructor(
    public readonly id: string,
    private _adminId: string,
    private _name: string,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _memberships?: ProjectMembership[],
    private _categories?: Category[],
    private _projectInvitations?: ProjectInvitation[],
  ) {}

  get adminId(): string {
    return this._adminId;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get memberships(): ProjectMembership[] {
    return this._memberships ? this._memberships : [];
  }

  get categories(): Category[] {
    return this._categories ? this._categories : [];
  }

  get projectInvitations(): ProjectInvitation[] {
    return this._projectInvitations ? this._projectInvitations : [];
  }

  static create(props: ProjectProps): Project {
    const now = new Date();
    const id = uuidv4();
    return new Project(id, props.adminId, props.name, now, now);
  }
}
