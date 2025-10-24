import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { CacheEvict } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisService } from '@libs/redis';

import { DeleteProjectCommand } from '@project/application/port/in/command/unti-project/delete-project.command';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectLifeCyclePolicy } from '@project/domain/logic/project-management/project-lifecycle.policy';

@Injectable()
@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly redisService: RedisService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:project:${args[0].projectId}`],
    timing: 'after',
  })
  @Transactional()
  async execute(command: DeleteProjectCommand): Promise<Project> {
    await this.authorize(command.projectId, command.adminId);
    return await this.process(command);
    try {
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async authorize(projectId: string, reqUserId: string): Promise<void> {
    const project = await this.projectService.queryProjectById({
      id: projectId,
    });
    ProjectLifeCyclePolicy.canDeleteProject(project, reqUserId);
  }

  private async process(command: DeleteProjectCommand): Promise<Project> {
    return await this.projectService.deleteProject({
      id: command.projectId,
    });
  }
}
