import { v4 as uuidv4 } from 'uuid';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { Category } from '@project/domain/entity/category.entity';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';
import { DomainException, ErrorCode } from '@libs/exception';

type ProjectMutableProps = {
  adminId: string;
  name: string;
  memberships?: ProjectMembership[];
  categories?: Category[];
  projectInvitations?: ProjectInvitation[];
};

type ProjectProps = BaseEntityProps & ProjectMutableProps;
type CreateProjectProps = Omit<ProjectProps, 'id' | 'createdAt' | 'updatedAt'>;

export class Project extends BaseEntity<ProjectProps> {
  private _adminId: string;
  private _name: string;
  private _categories?: Category[];
  private _projectInvitations?: ProjectInvitation[];
  private _projectMemberships?: ProjectMembership[];

  private constructor(props: ProjectProps) {
    super(props);

    this._adminId = props.adminId;
    this._name = props.name;

    this._categories = props.categories;
    this._projectInvitations = props.projectInvitations;
    this._projectMemberships = props.memberships;
  }

  get adminId(): string {
    return this._adminId;
  }

  get name(): string {
    return this._name;
  }

  get projectMemberships(): ProjectMembership[] {
    return this._projectMemberships ? this._projectMemberships : [];
  }

  get categories(): Category[] {
    return this._categories || [];
  }

  get projectInvitations(): ProjectInvitation[] {
    return this._projectInvitations || [];
  }

  static create(props: CreateProjectProps): Project {
    const now = this.generateTimestamp();
    const id = this.generateUuid();

    return new Project({
      name: props.name,
      id: id,
      updatedAt: now,
      createdAt: now,
      projectInvitations: props.projectInvitations,
      categories: props.categories,
      memberships: props.memberships,
      adminId: props.adminId,
    });
  }

  static reconstitute(props: ProjectProps): Project {
    return new Project({
      name: props.name,
      id: props.id,
      updatedAt: props.updatedAt,
      createdAt: props.createdAt,
      projectInvitations: props.projectInvitations,
      categories: props.categories,
      memberships: props.memberships,
      adminId: props.adminId,
    });
  }

  changeName(name: string) {
    if (!name) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._name = name;
    this.updateTimestamp();
  }

  changeAdminId(id: string) {
    if (!id) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._adminId = id;
    this.updateTimestamp();
  }
}
