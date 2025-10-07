import { Inject, Injectable } from '@nestjs/common';

import { EnrollProjectMembershipParams } from '@project/application/param/project-membership.params';
import {
  IProjectMembershipRepository,
  ProjectMembershipRepositorySymbol,
} from '@project/application/port/out/project-membership-repository.port';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';

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
