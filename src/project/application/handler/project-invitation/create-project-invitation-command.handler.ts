import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectService } from '@project/application/service/project.service';
import { CreateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/create-project-invitation.command';
import { Inject } from '@nestjs/common';
import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { Transactional } from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

@CommandHandler(CreateProjectInvitationCommand)
export class CreateProjectInvitationCommandHandler
  implements ICommandHandler<CreateProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    private readonly projectService: ProjectService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
  ) {}

  @Transactional()
  async execute(
    command: CreateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    try {
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
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
