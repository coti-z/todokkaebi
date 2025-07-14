import {
  CreateProjectInvitationProps,
  type ProjectInvitation,
} from '@project/domain/entity/project-invitation.entity';
import { Project } from '@project/domain/entity/project.entity';

export type CreateProjectInvitationParams = CreateProjectInvitationProps & {
  project: Project;
};

export type UpdateProjectInvitationParams = Pick<
  ProjectInvitation,
  'status' | 'id'
> & {
  reqUserId: string;
};

export type AcceptProjectInvitationParams = Pick<ProjectInvitation, 'id'> & {
  reqUserId: string;
};

export type RejectProjectInvitationParams = Pick<ProjectInvitation, 'id'> & {
  reqUserId: string;
};
