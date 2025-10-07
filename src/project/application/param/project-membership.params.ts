import { CreateProjectMembershipProps } from '@project/domain/entity/project-membership.entity';

export type EnrollProjectMembershipParams = Pick<
  CreateProjectMembershipProps,
  'userId' | 'role' | 'projectId'
>;
