import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { UpdateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/update-project-invitation.command';
import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

@Injectable()
@CommandHandler(UpdateProjectInvitationCommand)
export class UpdateProjectInvitationCommandHandler
  implements ICommandHandler<UpdateProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}
  async execute(
    command: UpdateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    try {
      return await this.projectInvitationService.updateProjectInvitation({
        id: command.id,
        reqUserId: command.reqUserId,
        status: command.status,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
