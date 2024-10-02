import { CategoryModel } from '@/todo/domain/model/category.model';
import { Category } from '@prisma/client';

export class CategoryMapper {
  static toDomain(category: Category): CategoryModel {
    return {
      ...category,
    };
  }

  static toDomains(categories: Category[]): CategoryModel[] {
    return categories.map(category => this.toDomain(category));
  }
}
