import {
  CategoryRepositorySymbol,
  ICategoryRepository,
} from '@project/application/port/out/category-repository.port';
import {
  DeleteCategoryParams,
  QueryCategoryParams,
  UpdateCategoryParams,
  CreateCategoryParams,
} from '@project/application/param/category.params';

import { Category } from '@project/domain/entity/category.entity';
import { Inject } from '@nestjs/common';
import { CategoryPolicyLogic } from '@project/domain/logic/category-policy.logic';
import { ErrorCode, errorFactory } from '@libs/exception';
import { QueryProjectByTaskIdParams } from '../param/project.params';

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
    CategoryPolicyLogic.canDeleteCategory(params.project, params.reqUserId);

    const category = await this.categoryRepo.findCategoryById(params.id);

    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    await this.categoryRepo.deleteCategoryById(params.id);
    return category;
  }

  async updateCategory(params: UpdateCategoryParams): Promise<Category> {
    const category = await this.categoryRepo.findCategoryById(params.id);
    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    CategoryPolicyLogic.updateCategory(
      params.project,
      category,
      params.reqUserId,
      params.name,
    );
    await this.categoryRepo.updateCategory(category);
    return category;
  }

  async queryCategoryById(
    params: QueryProjectByTaskIdParams,
  ): Promise<Category> {
    const category = await this.categoryRepo.findCategoryById(
      params.categoryId,
    );
    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }

    return category;
  }
}
