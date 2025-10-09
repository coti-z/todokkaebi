import { DomainException, ErrorCode } from '@libs/exception';

import { Category } from '@project/domain/entity/category.entity';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

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

/**
 * project domain entity
 *
 * @remarks
 * Encapsulates the core properties and authorization logic of a project
 *
 * main responsibility:
 * - Verify domain rules when changing project name or admin
 * - check user authorization (Admin/Member/Owner)
 * - Managing associated entities (Category, Membership, Invitation)
 */
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

  /**
   * create project entity
   *
   * @static
   * @param {CreateProjectProps} props
   * @return {*}  {Project} - return project entity
   * @memberof Project
   *
   * @remarks
   * - Factory Method pattern: Encapsulating entity creation logic
   * - used when creating a new business object
   */
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

  /**
   * Reconstitute Project entity from database data
   *
   * @param {ProjectProps} props - Complete properties including id and timestamps
   * @return {*}  {Project} - Reconstituted project entity
   * @memberof Project
   */
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

  // ─────────────────────────────────────
  // getter
  // ─────────────────────────────────────

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

  // ─────────────────────────────────────
  // method
  // ─────────────────────────────────────
  /**
   * add category
   *
   * @param {Category} category - category entity
   * @memberof Project
   */
  addCategory(category: Category): void {
    this._categories.push(category);
    this.updateTimestamp();
  }
  /**
   * change name
   *
   * @param {string} name - change project name
   * @memberof Project
   */
  changeName(name: string): void {
    if (!name) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._name = name;
    this.updateTimestamp();
  }

  /**
   * change admin
   *
   * @param {string} id - User ID
   * @memberof Project
   */
  changeAdminId(id: string): void {
    if (!id) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    this._adminId = id;
    this.updateTimestamp();
  }
  isAdmin(userId: string): boolean {
    return this._adminId === userId;
  }

  isMember(userId: string): boolean {
    return this._projectMemberships.some(
      membership => membership.userId === userId,
    );
  }

  isOwner(userId: string): boolean {
    const membership = this._projectMemberships.find(m => m.userId === userId);
    return membership?.role === MembershipRole.OWNER;
  }

  getMembershipRole(userId: string): MembershipRole | null {
    const membership = this._projectMemberships.find(m => m.userId === userId);
    return membership?.role || null;
  }

  /**
   * check project access
   *
   * @param {string} userId - User ID
   * @return {*}  {boolean} - Admin
   * @memberof Project
   */
  hasAccessPermission(userId: string): boolean {
    return this.isAdmin(userId) || this.isMember(userId);
  }
}
