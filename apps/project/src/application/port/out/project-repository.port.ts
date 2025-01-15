import { Project } from '../../../domain/entity/project.entity';

export interface IProjectRepositoryPort {
  createProject(entity: Project): void;
}
