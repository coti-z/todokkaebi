import { Project } from '@project/domain/entity/project.entity';
import { ErrorCode, errorFactory } from '@libs/exception';
import { Category } from '@project/domain/entity/category.entity';

export class CategoryPolicyLogic {
  static canDeleteCategory(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
  static updateCategory(
    project: Project,
    category: Category,
    reqUserId: string,
    name?: string,
  ) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    if (name) {
      category.changeName(name);
    }
  }
}
