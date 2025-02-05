import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectInvitationCommand } from '../create-project-invitation.command';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectService } from '@project/application/service/project.service';

@CommandHandler(CreateProjectInvitationCommand)
export class CreateProjectInvitationCommandHandler
  implements ICommandHandler<CreateProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    private readonly projectService: ProjectService,
  ) {}

  async execute(
    command: CreateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    const project = await this.projectService.queryProject({
      id: command.projectId,
      userId: command.inviterUserId,
    });

    return await this.projectInvitationService.createProjectInvitation({
      inviteeUserId: command.inviteeUserId,
      inviterUserId: command.inviterUserId,
      projectId: command.projectId,
      project,
    });
  }
}
