import { Project } from '@project/domain/entity/project.entity';
import { Category } from '@project/domain/entity/category.entity';
import { errorFactory } from '@libs/exception/error-factory.exception';
import { ErrorCode } from '@libs/exception/error-code.enum';

export class CategoryPolicyLogic {
  static canDeleteCategory(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }

  static changeName(
    project: Project,
    category: Category,
    reqUserId: string,
    name: string,
  ) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    category.update({
      name: name,
    });
  }
}
