import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';

export const ProjectInvitationRepositorySymbol = Symbol.for(
  'ProjectInvitationRespository',
);

export interface IProjectInvitationRepository {
  storeProjectInvitation(entity: ProjectInvitation): Promise<void>;
  findProjectInvitationById(
    projectInvitationId: string,
  ): Promise<ProjectInvitation | null>;
}
