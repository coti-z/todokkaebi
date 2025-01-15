import { Project } from '@project/domain/entity/project.entity';

export const ProjectRepositorySymbol = Symbol.for('ProjectRepository');
export interface IProjectRepository {
  createProject(entity: Project): Promise<void>;
}
