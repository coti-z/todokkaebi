import { Transactional } from '@libs/database';
import { ITransactionManager, TransactionManagerSymbol } from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '@project/application/port/in/command/category/delete-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
  ) {}

  @Transactional()
  async execute(command: DeleteCategoryCommand): Promise<Category> {
    try {
      const project = await this.projectService.queryProjectByCategoryId({
        categoryId: command.categoryId,
      });
      return await this.categoryService.deleteCategory({
        reqUserId: command.userId,
        project,
        id: command.categoryId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
