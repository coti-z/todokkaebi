import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/reject-project-invitation.command';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';

@CommandHandler(RejectProjectInvitationCommand)
export class RejectProjectInvitationCommandHandler
  implements ICommandHandler<RejectProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManger: ITransactionManager,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}

  async execute(
    command: RejectProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    try {
      return await this.projectInvitationService.rejectProjectInvitation({
        id: command.id,
        reqUserId: command.reqUserId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
