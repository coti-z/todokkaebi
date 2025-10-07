import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { CreateProjectCommand } from '@project/application/port/in/command/unti-project/create-project.command';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectLifeCyclePolicy } from '@project/domain/logic/project-management/project-lifecycle.policy';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    private readonly projectMembershipService: ProjectMembershipService,
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: CreateProjectCommand): Promise<Project> {
    try {
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async process(command: CreateProjectCommand): Promise<Project> {
    const project = await this.projectService.createProject({
      name: command.name,
      adminId: command.userId,
    });
    await this.projectMembershipService.enrollProjectMembership({
      projectId: project.id,
      role: MembershipRole.OWNER,
      userId: command.userId,
    });

    return project;
  }
}
