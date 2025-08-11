import {
  Category,
  CategoryProps,
} from '@project/domain/entity/category.entity';
import { Project } from '@project/domain/entity/project.entity';

export type CreateCategoryParams = Pick<Category, 'name' | 'projectId'>;

export type DeleteCategoryParams = Pick<Category, 'id'> & {
  reqUserId: string;
};

export type ChangeCategoryNameParams = Pick<Category, 'id' | 'name'> & {
  reqUserId: string;
};

export type QueryCategoryByIdParams = Pick<Category, 'id'> & {
  reqUserId: string;
};
