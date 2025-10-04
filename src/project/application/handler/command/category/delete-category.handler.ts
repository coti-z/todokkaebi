import { Transactional } from '@libs/database';
import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { CacheEvict } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisService } from '@libs/redis';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '@project/application/port/in/command/category/delete-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';
import { Project } from '@project/domain/entity/project.entity';
import { CategoryOrganizationPolicy } from '@project/domain/logic/category-management/category-organization.policy';

/**
 * 카테고리 삭제 핸들러
 */
@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    private readonly redisService: RedisService,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,

    private readonly projectMembershipService: ProjectMembershipService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}

  @CacheEvict({
    keys: args => [`entity:category:${args[0].categoryId}`],
    timing: 'after',
  })
  @Transactional()
  async execute(command: DeleteCategoryCommand): Promise<Category> {
    try {
      await this.authorize(command.categoryId, command.userId);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async authorize(categoryId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId,
    });

    CategoryOrganizationPolicy.canDeleteCategory(project, reqUserId);
  }

  private async process(command: DeleteCategoryCommand): Promise<Category> {
    return await this.categoryService.deleteCategory({
      id: command.categoryId,
    });
  }
}
