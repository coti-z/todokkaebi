import { CreateCategoryCommand } from '@/todo/application/commands/create-category.command';
import { DeleteCategoryCommand } from '@/todo/application/commands/delete-category.command';
import { UpdateCategoryCommand } from '@/todo/application/commands/update-category.command';
import { GetAllCategoriesQuery } from '@/todo/application/queries/get-all-category.query';
import { GetCategoryQuery } from '@/todo/application/queries/get-category.query';
import { CategoryModel } from '@/todo/domain/model/category.model';
import { CategoryRepository } from '@/todo/infrastructure/database/repository/category.repository';
import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(
    query: GetAllCategoriesQuery,
    userId: string,
  ): Promise<CategoryModel[]> {
    if (query.userId !== userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return await this.categoryRepository.getAllCategories(query.projectId);
  }

  async getCategoryWithId(query: GetCategoryQuery): Promise<CategoryModel> {
    const userId = await this.categoryRepository.getUserIdWithCategoryId(
      query.id,
    );
    if (!userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    const category = await this.categoryRepository.getCategoryById(query.id);
    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }

    return category;
  }

  async createCategory(command: CreateCategoryCommand): Promise<CategoryModel> {
    return await this.categoryRepository.createCategory({
      name: command.name,
      Project: {
        connect: {
          id: command.projectId,
        },
      },
    });
  }

  async updateCategory(cmd: UpdateCategoryCommand): Promise<CategoryModel> {
    const category = await this.categoryRepository.getCategoryById(cmd.id);
    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return await this.categoryRepository.updateCategory(cmd.id, {
      name: cmd.name,
    });
  }

  async deleteCategory(cmd: DeleteCategoryCommand): Promise<CategoryModel> {
    const category = await this.categoryRepository.getCategoryById(cmd.id);
    if (!category) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    const userId = await this.categoryRepository.getUserIdWithCategoryId(
      cmd.id,
    );
    if (!userId) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (userId !== cmd.userId) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return await this.categoryRepository.deleteCategory(cmd.id);
  }
}
