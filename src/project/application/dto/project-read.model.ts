import { CategoryReadModel } from '@project/application/dto/category-read.model';
import { ProjectInvitationReadModel } from '@project/application/dto/project-invitation-read.model';
import { ProjectMembershipReadModel } from '@project/application/dto/project-membership-read.model';

export class ProjectReadModel {
  id: string;
  adminId: string;
  name: string;
  categories: CategoryReadModel[];
  projectInvitations: ProjectInvitationReadModel[];
  projectMemberships: ProjectMembershipReadModel[];
  createdAt: Date;
  updatedAt: Date;
}
