import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectService } from '@project/application/service/project.service';
import { UpdateProjectCommand } from '@project/application/port/in/command/unti-project/update-project.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { ProjectLifeCyclePolicy } from '@project/domain/logic/project-management/project-lifecycle.policy';

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly redisService: RedisService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:project:${args[0].id}`],
  })
  @Transactional()
  async execute(command: UpdateProjectCommand): Promise<Project> {
    try {
      await this.authorize(command.projectId, command.userId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async authorize(projectId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectById({
      id: projectId,
    });

    ProjectLifeCyclePolicy.canChangeProjectName(project, reqUserId);
  }

  private async process(command: UpdateProjectCommand): Promise<Project> {
    return await this.projectService.updateProject({
      id: command.projectId,
      name: command.projectName,
    });
  }
}
