import { GetCategoryQuery } from '@/todo/application/queries/get-category.query';
import { CategoryService } from '@/todo/application/services/category.service';
import { CategoryModel } from '@/todo/domain/model/category.model';
import { CategoryResponse } from '@/todo/presentation/resolvers/dto/objects/category-response.object';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler {
  constructor(private readonly categoryService: CategoryService) {}
  async execute(query: GetCategoryQuery): Promise<CategoryResponse> {
    try {
      const category = await this.categoryService.getCategoryWithId(query);
      return {
        category,
        success: true,
      };
    } catch (e) {
      throw e;
    }
  }
}
