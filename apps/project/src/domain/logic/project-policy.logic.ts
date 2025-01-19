import { Project } from '@project/domain/entity/project.entity';
import { ErrorCode, errorFactory } from '@libs/exception';

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
