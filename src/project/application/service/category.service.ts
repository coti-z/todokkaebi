import { Inject } from '@nestjs/common';
import {
  ChangeCategoryNameParams,
  CreateCategoryParams,
  DeleteCategoryParams,
  QueryCategoryByIdParams,
} from '@project/application/param/category.params';
import {
  CategoryRepositorySymbol,
  ICategoryRepository,
} from '@project/application/port/out/category-repository.port';
import { Category } from '@project/domain/entity/category.entity';
import { ApplicationException, ErrorCode } from '@libs/exception';

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

  async deleteCategory(params: DeleteCategoryParams): Promise<Category> {
    const category = await this.categoryRepo.findCategoryById(params.id);
    if (!category) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    await this.categoryRepo.deleteCategoryById(params.id);
    return category;
  }

  async changeName(params: ChangeCategoryNameParams): Promise<Category> {
    const category = await this.categoryRepo.findCategoryById(params.id);
    if (!category) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    category.changeName(params.name);
    await this.categoryRepo.updateCategory(category);
    return category;
  }

  async queryCategoryById(params: QueryCategoryByIdParams): Promise<Category> {
    const category = await this.categoryRepo.findCategoryById(params.id);
    if (!category) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    return category;
  }
}
