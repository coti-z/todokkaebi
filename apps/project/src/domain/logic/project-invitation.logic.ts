import { ErrorCode, errorFactory } from '@libs/exception';
import { Project } from '../entity/project.entity';

export class ProjectInvitationLogic {
  static canProjectInvitation(project: Project, reqUserId: string) {
    if (project.adminId !== reqUserId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
}
