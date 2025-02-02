import { Injectable } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectInvitationCommand } from '../update-project-invitation.command';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';

@Injectable()
@CommandHandler(UpdateProjectInvitationCommand)
export class UpdateProjectInvitationCommandHandler
  implements ICommandHandler<UpdateProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
  ) {}
  async execute(
    command: UpdateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    return await this.projectInvitationService.updateProjectInvitation({
      id: command.id,
      reqUserId: command.reqUserId,
      status: command.status,
    });
  }
}
