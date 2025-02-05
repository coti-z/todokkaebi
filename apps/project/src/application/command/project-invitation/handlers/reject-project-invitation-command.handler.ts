import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectProjectInvitationCommand } from '../reject-project-invitation.command';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';

@CommandHandler(RejectProjectInvitationCommand)
export class RejectProjectInvitationCommandHandler
  implements ICommandHandler<RejectProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
  ) {}

  async execute(
    command: RejectProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    return await this.projectInvitationService.rejectProjectInvitation({
      id: command.id,
      reqUserId: command.reqUserId,
    });
  }
}
