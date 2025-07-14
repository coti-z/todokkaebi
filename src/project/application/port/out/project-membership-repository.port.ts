import { TransactionContext } from '@libs/database/index';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export const ProjectMembershipRepositorySymbol = Symbol.for(
  'ProjectMembershipRepository',
);
export interface IProjectMembershipRepository {
  storeProjectMembership(entity: ProjectMembership): Promise<void>;
}
