import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export type EnrollProjectMembershipParams = Pick<
  ProjectMembership,
  'userId' | 'role' | 'projectId'
>;
