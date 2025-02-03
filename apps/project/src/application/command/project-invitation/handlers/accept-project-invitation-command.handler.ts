import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptProjectInvitationCommand } from '../accept-project-invitation.command';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';

@Injectable()
@CommandHandler(AcceptProjectInvitationCommand)
export class AcceptProjectInvitationCommandHandler
  implements ICommandHandler<AcceptProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
  ) {}

  async execute(
    command: AcceptProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    return await this.projectInvitationService.acceptProjectInvitation({
      id: command.id,
      reqUserId: command.reqUserId,
    });
  }
}
