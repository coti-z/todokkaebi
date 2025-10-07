import { TransactionContext } from '@libs/database';

import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export const ProjectMembershipRepositorySymbol = Symbol.for(
  'ProjectMembershipRepository',
);

export type findByUserIdAndProjectIdArgs = {
  userId: string;
  projectId: string;
};
export interface IProjectMembershipRepository {
  storeProjectMembership(entity: ProjectMembership): Promise<void>;

  findProjectMembershipByUserIdAndProjectId(
    args: findByUserIdAndProjectIdArgs,
  ): Promise<ProjectMembership | null>;
}
