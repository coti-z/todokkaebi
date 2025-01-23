import { Project } from '@project/domain/entity/project.entity';
import { ErrorCode, errorFactory } from '@libs/exception';

export class CategoryPolicyLogic {
  static canDeleteCategory(project: Project, userId: string) {
    if (project.adminId !== userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
