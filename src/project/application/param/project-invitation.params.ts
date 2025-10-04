import {
  CreateProjectInvitationProps,
  type ProjectInvitation,
} from '@project/domain/entity/project-invitation.entity';

export type CreateProjectInvitationParams = Pick<
  CreateProjectInvitationProps,
  'inviteeUserId' | 'inviterUserId' | 'projectId'
>;

export type UpdateProjectInvitationParams = Pick<
  ProjectInvitation,
  'status' | 'id'
>;
