import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { CacheEvict } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisService } from '@libs/redis';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '@project/application/port/in/command/unti-project/delete-project.command';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';

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
    try {
      return await this.projectService.deleteProject({
        adminId: command.adminId,
        id: command.projectId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
