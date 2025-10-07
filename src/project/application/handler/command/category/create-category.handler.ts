import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { CreateCategoryCommand } from '@project/application/port/in/command/category/create-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';
import { CategoryOrganizationPolicy } from '@project/domain/logic/category-management/category-organization.policy';

/**
 * 카테고리 생성 핸들러
 */
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly categoryService: CategoryService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
    private readonly projectService: ProjectService,
  ) {}

  @Transactional()
  async execute(command: CreateCategoryCommand): Promise<Category> {
    try {
      await this.authorize(command.projectId, command.userId);
      return this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  private async authorize(projectId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectById({
      id: projectId,
    });
    CategoryOrganizationPolicy.canCreateCategory(project, reqUserId);
  }

  private async process(command: CreateCategoryCommand) {
    return await this.categoryService.createCategory({
      name: command.name,
      projectId: command.projectId,
    });
  }
}
