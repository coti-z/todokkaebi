export interface CategoryParams {
  id: string;
  name: string;
  projectId: string;
}

export type CreateCategoryParams = Pick<CategoryParams, 'name' | 'projectId'>;
