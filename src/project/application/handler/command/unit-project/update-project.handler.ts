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
      return await this.projectService.updateProject({
        name: command.projectName,
        id: command.projectId,
        adminId: command.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
