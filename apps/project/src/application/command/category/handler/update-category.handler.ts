import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '@project/application/command/category/update-category.command';
import { Injectable } from '@nestjs/common';
import { ProjectService } from '@project/application/service/project.service';
import { Category } from '@project/domain/entity/category.entity';
import { CategoryService } from '@project/application/service/category.service';

@CommandHandler(UpdateCategoryCommand)
@Injectable()
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
  ) {}
  async execute(command: UpdateCategoryCommand): Promise<Category> {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId: command.categoryId,
    });
    return await this.categoryService.updateCategory({
      project: project,
      id: command.categoryId,
      name: command.name,
      reqUserId: command.reqUserId,
    });
  }
}
