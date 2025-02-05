import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptProjectInvitationCommand } from '../accept-project-invitation.command';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

@Injectable()
@CommandHandler(AcceptProjectInvitationCommand)
export class AcceptProjectInvitationCommandHandler
  implements ICommandHandler<AcceptProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    private readonly projectMembershipService: ProjectMembershipService,
  ) {}

  async execute(
    command: AcceptProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    try {
      const projectInvitation =
        await this.projectInvitationService.acceptProjectInvitation({
          id: command.id,
          reqUserId: command.reqUserId,
        });

      await this.projectMembershipService.enrollProjectMembership({
        projectId: projectInvitation.projectId,
        role: MembershipRole.MEMBER,
        userId: command.reqUserId,
      });

      return projectInvitation;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
