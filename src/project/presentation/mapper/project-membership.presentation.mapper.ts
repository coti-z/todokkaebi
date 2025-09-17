import { ProjectMembershipReadModel } from '@project/application/dto/project-membership-read.model';
import { ProjectMembershipType } from '@project/presentation/resolver/type/project-membership.type';

export class ProjectMembershipPresentationMapper {
  static readModelToObjectType(
    readModel: ProjectMembershipReadModel,
  ): ProjectMembershipType {
    return {
      projectId: readModel.projectId,
      id: readModel.id,
      role: readModel.role,
      userId: readModel.userId,
      createdAt: new Date(readModel.createdAt),
      updatedAt: new Date(readModel.updatedAt),
    };
  }

  static readModelsToObjectType(
    readModels: ProjectMembershipReadModel[],
  ): ProjectMembershipType[] {
    if (!readModels) return [];
    return readModels.map(readModel => this.readModelToObjectType(readModel));
  }
}
