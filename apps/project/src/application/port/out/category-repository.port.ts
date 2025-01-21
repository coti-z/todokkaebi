import { Category } from '@project/domain/entity/category.entity';

export const CategoryRepositorySymbol = Symbol.for('CategoryRepository');
export interface ICategoryRepository {
  storeCategory(entity: Category): Promise<void>;
}
