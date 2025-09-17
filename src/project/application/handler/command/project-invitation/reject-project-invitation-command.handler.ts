import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { CacheEvict } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisService } from '@libs/redis';
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
    private readonly transactionManager: ITransactionManager,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    private readonly redisService: RedisService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:project-invitation:${args[0].id}`],
    timing: 'after',
  })
  @Transactional()
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
