import { DomainException, ErrorCode } from '@libs/exception';
import { Project } from '@project/domain/entity/project.entity';

export class ProjectPolicyLogic {
  public static changeProjectName(
    project: Project,
    userId: string,
    newName: string,
  ) {
    if (project.adminId !== userId) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
    project.changeName({
      name: newName,
    });
  }
}
