import { ProjectModel } from '@/todo/domain/model/project.model';
import { Project } from '@prisma/client';

export class ProjectMapper {
  static toDomain(project: Project): ProjectModel {
    return {
      ...project,
    };
  }
  static toDomains(projects: Project[]): ProjectModel[] {
    return projects.map(project => this.toDomain(project));
  }
}
