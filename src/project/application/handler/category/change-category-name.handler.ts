import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';
import { CategoryService } from '@project/application/service/category.service';
import { ChangeCategoryNameCommand } from '@project/application/port/in/command/category/change-category-name.command';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
@Injectable()
@CommandHandler(ChangeCategoryNameCommand)
export class ChangeCategoryNameHandler
  implements ICommandHandler<ChangeCategoryNameCommand>
{
  constructor(
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
  ) {}

  @Transactional()
  async execute(command: ChangeCategoryNameCommand): Promise<Category> {
    try {
      const project = await this.projectService.queryProjectByCategoryId({
        categoryId: command.categoryId,
      });
      return await this.categoryService.changeName({
        project: project,
        id: command.categoryId,
        name: command.name,
        reqUserId: command.reqUserId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
