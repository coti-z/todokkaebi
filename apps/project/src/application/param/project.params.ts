import { Project } from '@project/domain/entity/project.entity';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

export type CreateProjectParams = Pick<Project, 'adminId' | 'name'>;

export type DeleteProjectParams = Pick<Project, 'adminId' | 'id'>;

export type UpdateProjectParams = Pick<Project, 'adminId' | 'name' | 'id'>;

export type QueryProjectsByUserIdParams = Pick<ProjectMembership, 'userId'>;

export type QueryProjectParams = Pick<Project, 'id'> & { userId: string };

export type QueryProjectByTaskIdParams = {
  taskId: string;
};
