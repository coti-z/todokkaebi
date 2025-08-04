import { Project } from '@project/domain/entity/project.entity';
import { Category } from '@project/domain/entity/category.entity';
import {
  ApplicationException,
  DomainException,
  ErrorCode,
} from '@libs/exception';
export class CategoryPolicyLogic {
  static canDeleteCategory(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }

  static changeName(
    project: Project,
    category: Category,
    reqUserId: string,
    name: string,
  ) {
    if (project.adminId !== reqUserId) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }

    category.changeName(name);
  }
}
