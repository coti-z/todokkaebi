import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { UpdateProjectInvitationCommand } from '@project/application/port/in/command/project-invitation/update-project-invitation.command';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { ProjectInvitationPolicy } from '@project/domain/logic/membership/project-invitation.policy';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

@Injectable()
@CommandHandler(UpdateProjectInvitationCommand)
export class UpdateProjectInvitationCommandHandler
  implements ICommandHandler<UpdateProjectInvitationCommand>
{
  constructor(
    private readonly projectInvitationService: ProjectInvitationService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    private readonly redisService: RedisService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly projectMembershipService: ProjectMembershipService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:project-invitation:${args[0].id}`],
    timing: 'after',
  })
  @Transactional()
  async execute(
    command: UpdateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    try {
      await this.authorize(command.id, command.status, command.reqUserId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
  private async authorize(
    projectInvitationId: string,
    status: InvitationStatus,
    requestUserId: string,
  ) {
    const projectInvitation =
      await this.projectInvitationService.findProjectInvitationById({
        id: projectInvitationId,
      });

    ProjectInvitationPolicy.canUpdateProjectInvitation(
      projectInvitation,
      status,
      requestUserId,
    );
  }

  private async process(
    command: UpdateProjectInvitationCommand,
  ): Promise<ProjectInvitation> {
    const projectInvitation =
      await this.projectInvitationService.updateProjectInvitation({
        id: command.id,
        reqUserId: command.reqUserId,
        status: command.status,
      });

    if (command.status === InvitationStatus.ACCEPTED) {
      await this.projectMembershipService.enrollProjectMembership({
        projectId: command.id,
        role: MembershipRole.MEMBER,
        userId: command.reqUserId,
      });
    }

    return projectInvitation;
  }
}
