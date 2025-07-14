import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';
import { AcceptProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/accept-project-invitation.command';
import {
  ITransactionManager,
  TransactionManagerSymbol,
} from '@libs/database/index';

@Injectable()
@CommandHandler(AcceptProjectInvitationCommand)
export class AcceptProjectInvitationCommandHandler
  implements ICommandHandler<AcceptProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    private readonly projectMembershipService: ProjectMembershipService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
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
