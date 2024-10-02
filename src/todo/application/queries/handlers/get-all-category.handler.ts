import { GetAllCategoriesQuery } from '@/todo/application/queries/get-all-category.query';
import { CategoryService } from '@/todo/application/services/category.service';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { GetAllCategoryResponse } from '@/todo/presentation/resolvers/dto/objects/get-all-category.object';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoryHandler
  implements IQueryHandler<GetAllCategoriesQuery>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
  ) {}
  async execute(query: GetAllCategoriesQuery): Promise<GetAllCategoryResponse> {
    try {
      const projectUserId = await this.projectService.getProjectUserId(
        query.projectId,
      );
      const categories = await this.categoryService.getAllCategories(
        query,
        projectUserId,
      );

      return {
        success: true,
        categories,
        total: categories.length,
      };
    } catch (e) {
      throw e;
    }
  }
}
