import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChangeCategoryNameCommand } from '@project/application/port/in/command/category/change-category-name.command';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Cache, CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
@Injectable()
@CommandHandler(ChangeCategoryNameCommand)
export class ChangeCategoryNameHandler
  implements ICommandHandler<ChangeCategoryNameCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,

    private readonly projectMembershipService: ProjectMembershipService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly redisService: RedisService,
  ) {}

  @CacheEvict({
    keys: args => [`entity:category:${args[0].categoryId}`],
    timing: 'after',
  })
  @Transactional()
  async execute(command: ChangeCategoryNameCommand): Promise<Category> {
    try {
      const project = await this.projectService.queryProjectByCategoryId({
        categoryId: command.categoryId,
      });
      await this.projectMembershipService.isProjectMember({
        projectId: project.id,
        userId: command.userId,
      });
      return await this.categoryService.changeName({
        id: command.categoryId,
        name: command.name,
        reqUserId: command.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
