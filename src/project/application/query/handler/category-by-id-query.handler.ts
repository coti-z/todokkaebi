import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryByIdQuery } from '../category-by-id.query';
import { Injectable } from '@nestjs/common';
import { CategoryService } from '@project/application/service/category.service';
import { Category } from '@project/domain/entity/category.entity';
import { ProjectService } from '@project/application/service/project.service';
import { ErrorHandlingStrategy } from '@libs/exception';

@QueryHandler(CategoryByIdQuery)
@Injectable()
export class CategoryByIdHandler implements IQueryHandler<CategoryByIdQuery> {
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
  ) {}

  async execute(query: CategoryByIdQuery): Promise<Category> {
    try {
      await this.projectService.isProjectOwnerByCategoryId({
        id: query.categoryId,
        reqUserId: query.userId,
      });

      return await this.categoryService.queryCategoryById({
        id: query.categoryId,
        reqUserId: query.userId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
