import {
  CategoryRepositorySymbol,
  ICategoryRepository,
} from '@project/application/port/out/category-repository.port';
import { CreateCategoryParams } from '@project/application/param/category.params';
import { Category } from '@project/domain/entity/category.entity';
import { Inject } from '@nestjs/common';

export class CategoryService {
  constructor(
    @Inject(CategoryRepositorySymbol)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async createCategory(params: CreateCategoryParams): Promise<Category> {
    const entity = Category.create({
      projectId: params.projectId,
      name: params.name,
    });
    await this.categoryRepo.storeCategory(entity);
    return entity;
  }
}
