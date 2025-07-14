import { ErrorCode } from '@libs/exception/error-code.enum';
import { errorFactory } from '@libs/exception/error-factory.exception';
import { Project } from '@project/domain/entity/project.entity';

export class ProjectPolicyLogic {
  public static changeProjectName(
    project: Project,
    userId: string,
    newName: string,
  ) {
    if (project.adminId !== userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    project.changeName({
      name: newName,
    });
  }
}
