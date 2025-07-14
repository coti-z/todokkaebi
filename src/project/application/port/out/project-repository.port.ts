import { TransactionContext } from '@libs/database/index';
import { Project } from '@project/domain/entity/project.entity';

export const ProjectRepositorySymbol = Symbol.for('ProjectRepository');
export interface IProjectRepository {
  createProject(entity: Project): Promise<void>;

  deleteProject(entity: Project): Promise<void>;
  updateProject(entity: Project): Promise<void>;
  findProjectById(id: string): Promise<Project | null>;
  findProjectByCategoryId(categoryId: string): Promise<Project | null>;
  findProjectByTaskId(taskId: string): Promise<Project | null>;
  findProjectsByUserId(userId: string): Promise<Project[]>;
}
