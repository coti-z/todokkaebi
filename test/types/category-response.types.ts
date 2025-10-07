import { ApiResponse } from '@libs/response';

export interface CreateCategoryData {
  id: string;
  name: string;
  projectId: string;
}

export interface DeleteCategoryData {
  id: string;
}

export interface ChangeCategoryNameData {
  id: string;
  name: string;
}

export interface QueryCategoryByIdData {
  id: string;
  name: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateCategoryResponse = {
  createCategory: ApiResponse<CreateCategoryData>;
};

export type DeleteCategoryResponse = {
  deleteCategory: ApiResponse<DeleteCategoryData>;
};

export type ChangeCategoryNameResponse = {
  changeCategoryName: ApiResponse<ChangeCategoryNameData>;
};

export type QueryCategoryByIdResponse = {
  queryCategoryById: ApiResponse<QueryCategoryByIdData>;
};
