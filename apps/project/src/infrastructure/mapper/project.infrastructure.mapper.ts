import { Project } from '@project/domain/entity/project.entity';

interface ProjectRecord {
  id: string;
  name: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectInfraMapper {
  static createToPersistence(entity: Project): ProjectRecord {
    return {
      id: entity.id,
      name: entity.name,
      adminId: entity.adminId,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
