import { CreateProjectInvitationProps } from '@project/domain/entity/project-invitation.entity';
import { Project } from '@project/domain/entity/project.entity';

export type ProjectInvitationParams = CreateProjectInvitationProps & {
  project: Project;
};
