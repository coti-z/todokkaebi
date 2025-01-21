import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '@project/application/command/category/create-category.command';
import { CategoryService } from '@project/application/service/category.service';
import { Category } from '@project/domain/entity/category.entity';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    return await this.categoryService.createCategory({
      name: command.name,
      projectId: command.projectId,
    });
  }
}
