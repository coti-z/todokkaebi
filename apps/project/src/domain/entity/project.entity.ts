import { v4 as uuidv4 } from 'uuid';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { Category } from '@project/domain/entity/category.entity';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ErrorCode, errorFactory } from '@libs/exception';

type ProjectImmutableProps = {
  readonly id: string;
  readonly createdAt: Date;
};

type ProjectMutableProps = {
  adminId: string;
  name: string;
  updatedAt: Date;
  memberships?: ProjectMembership[];
  categories?: Category[];
  projectInvitations?: ProjectInvitation[];
};

type ProjectProps = ProjectImmutableProps & ProjectMutableProps;
type CreateProjectProps = Omit<ProjectProps, 'id' | 'createdAt' | 'updatedAt'>;
type ChangeNameProps = Pick<ProjectMutableProps, 'name'>;

export class Project {
  private constructor(private readonly props: ProjectProps) {}

  get id(): string {
    return this.props.id;
  }

  get adminId(): string {
    return this.props.adminId;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get memberships(): ProjectMembership[] {
    return this.props.memberships ? this.props.memberships : [];
  }

  get categories(): Category[] {
    return this.props.categories || [];
  }

  get projectInvitations(): ProjectInvitation[] {
    return this.props.projectInvitations || [];
  }

  static create(props: CreateProjectProps): Project {
    const now = new Date();
    const id = uuidv4();
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

  changeName(req: ChangeNameProps) {
    if (!req.name) {
      throw errorFactory(ErrorCode.BAD_REQUEST);
    }
    this.props.name = req.name;
  }
}
