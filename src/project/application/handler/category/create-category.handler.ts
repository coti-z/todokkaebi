import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCategoryCommand } from '@project/application/port/in/command/category/create-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { Category } from '@project/domain/entity/category.entity';

import { ErrorHandlingStrategy } from '@libs/exception';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly categoryService: CategoryService,
    private readonly projectMembershipService: ProjectMembershipService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    try {
      this.projectMembershipService.isProjectMember({
        projectId: command.projectId,
        userId: command.userId,
      });
      return await this.categoryService.createCategory({
        name: command.name,
        projectId: command.projectId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
