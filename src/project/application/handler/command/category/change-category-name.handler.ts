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
import { CacheEvict } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { CategoryOrganizationPolicy } from '@project/domain/logic/category-management/category-organization.policy';

/**
 * 카테고리 이름 변경 핸들러
 * categoryId로 project 조회 -> 멤버십 확인 -> 이름 변경
 */
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
      await this.authorize(command.categoryId, command.userId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
  private async authorize(
    categoryId: string,
    reqUserId: string,
  ): Promise<void> {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId: categoryId,
    });
    CategoryOrganizationPolicy.canChangeCategoryName(project, reqUserId);
  }

  private async process(command: ChangeCategoryNameCommand): Promise<Category> {
    return await this.categoryService.changeName({
      id: command.categoryId,
      name: command.name,
    });
  }
}
