import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '@project/application/port/in/command/category/create-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { Category } from '@project/domain/entity/category.entity';
import { ErrorHandlingStrategy } from 'libs/exception/src/error-handling-strategy';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    try {
      return await this.categoryService.createCategory({
        name: command.name,
        projectId: command.projectId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
