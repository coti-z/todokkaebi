import { Category } from '@project/domain/entity/category.entity';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

import { DomainException, ErrorCode } from '@libs/exception';

import {
  BaseEntity,
  BaseEntityProps,
} from './abstract/base-entity.abstract.entity';

type ProjectMutableProps = {
  adminId: string;
  name: string;
  memberships?: ProjectMembership[];
  categories?: Category[];
  projectInvitations?: ProjectInvitation[];
};

type ProjectProps = BaseEntityProps & ProjectMutableProps;
export type CreateProjectProps = Omit<
  ProjectProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export class Project extends BaseEntity<ProjectProps> {
  private _adminId: string;
  private _name: string;
  private _categories: Category[];
  private _projectInvitations: ProjectInvitation[];
  private _projectMemberships: ProjectMembership[];

  private constructor(props: ProjectProps) {
    super(props);

    this._adminId = props.adminId;
    this._name = props.name;

    this._categories = props.categories || [];
    this._projectInvitations = props.projectInvitations || [];
    this._projectMemberships = props.memberships || [];
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

  get adminId(): string {
    return this._adminId;
  }

  get name(): string {
    return this._name;
  }

  get projectMemberships(): ProjectMembership[] {
    return this._projectMemberships;
  }

  get categories(): Category[] {
    return this._categories;
  }

  get projectInvitations(): ProjectInvitation[] {
    return this._projectInvitations;
  }

  addCategory(category: Category) {
    this._categories.push(category);
    this.updateTimestamp();
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

  // Authorization helper methods
  isAdmin(userId: string): boolean {
    return this._adminId === userId;
  }

  isMember(userId: string): boolean {
    return this._projectMemberships.some(
      membership => membership.userId === userId
    );
  }

  isOwner(userId: string): boolean {
    const membership = this._projectMemberships.find(
      m => m.userId === userId
    );
    return membership?.role === MembershipRole.OWNER;
  }

  getMembershipRole(userId: string): MembershipRole | null {
    const membership = this._projectMemberships.find(
      m => m.userId === userId
    );
    return membership?.role || null;
  }

  hasAccessPermission(userId: string): boolean {
    return this.isAdmin(userId) || this.isMember(userId);
  }
}
