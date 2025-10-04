import { Inject, Injectable } from '@nestjs/common';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { EnrollProjectMembershipParams } from '../param/project-membership.params';
import {
  IProjectMembershipRepository,
  ProjectMembershipRepositorySymbol,
} from '../port/out/project-membership-repository.port';
import { IsProjectMembershipParams } from '@project/application/param/is-project-membership.params';
import { DomainException, ErrorCode } from '@libs/exception';

@Injectable()
export class ProjectMembershipService {
  constructor(
    @Inject(ProjectMembershipRepositorySymbol)
    private readonly projectMembershipRepo: IProjectMembershipRepository,
  ) {}

  async enrollProjectMembership(
    params: EnrollProjectMembershipParams,
  ): Promise<void> {
    const projectMembership = ProjectMembership.create({
      projectId: params.projectId,
      role: params.role,
      userId: params.userId,
    });

    await this.projectMembershipRepo.storeProjectMembership(projectMembership);
  }
}
