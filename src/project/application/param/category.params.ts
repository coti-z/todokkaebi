import {
  Category,
  CategoryProps,
} from '@project/domain/entity/category.entity';

export type CreateCategoryParams = Pick<Category, 'name' | 'projectId'>;

export type DeleteCategoryParams = Pick<Category, 'id'>;

export type ChangeCategoryNameParams = Pick<Category, 'id' | 'name'>;

export type QueryCategoryByIdParams = Pick<Category, 'id'>;
