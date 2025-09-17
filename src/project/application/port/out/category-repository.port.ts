import { Category } from '@project/domain/entity/category.entity';

export const CategoryRepositorySymbol = Symbol.for('CategoryRepository');
export interface ICategoryRepository {
  storeCategory(entity: Category): Promise<void>;
  findCategoryById(entityId: string): Promise<Category | null>;
  deleteCategoryById(entityId: string): Promise<void>;
  updateCategory(entity: Category): Promise<void>;
}
