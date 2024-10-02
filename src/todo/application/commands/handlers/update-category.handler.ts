import { UpdateCategoryCommand } from '@/todo/application/commands/update-category.command';
import { CategoryService } from '@/todo/application/services/category.service';
import { CategoryResponse } from '@/todo/presentation/resolvers/dto/objects/category-response.object';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}
  async execute(command: UpdateCategoryCommand): Promise<CategoryResponse> {
    try {
      const category = await this.categoryService.updateCategory(command);
      return {
        success: true,
        category,
      };
    } catch (e) {
      throw e;
    }
  }
}
