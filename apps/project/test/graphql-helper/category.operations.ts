import { gql } from 'graphql-tag';

export enum CategoryQueries {
  QUERY_CATEGORY = 'QUERY_CATEGORY',
}

export enum CategoryMutations {
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
}

export const CategoryOperations = {
  [CategoryQueries.QUERY_CATEGORY]: gql`
    query QueryCategoryById($input: QueryCategoryByIdInput!) {
      queryCategoryById(input: $input) {
        status
        success
        message
        data {
          id
          name
          projectId
          createdAt
          updatedAt
          tasks {
            id
            title
            categoryId
            check
            status
            startDate
            endDate
            actualStartDate
            actualEndDate
            createdAt
            updateAt
          }
        }
      }
    }
  `,

  [CategoryMutations.CREATE_CATEGORY]: gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
      createCategory(input: $input) {
        status
        success
        message
        data {
          id
          name
          projectId
          createdAt
          updatedAt
        }
      }
    }
  `,

  [CategoryMutations.UPDATE_CATEGORY]: gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
      updateCategory(input: $input) {
        status
        success
        message
        data {
          id
          name
          projectId
          createdAt
          updatedAt
          tasks {
            id
            title
            categoryId
            check
            status
            startDate
            endDate
            actualStartDate
            actualEndDate
            createdAt
            updateAt
          }
        }
      }
    }
  `,

  [CategoryMutations.DELETE_CATEGORY]: gql`
    mutation DeleteCategory($input: DeleteCategoryInput!) {
      deleteCategory(input: $input) {
        status
        success
        message
        data {
          id
        }
      }
    }
  `,
};

export interface CategoryInputBase {
  id: string;
  name: string;
  projectId: string;
}

export interface CreateCategoryVariables {
  input: Pick<CategoryInputBase, 'name' | 'projectId'>;
}

export interface UpdateCategoryVariables {
  input: CategoryInputBase;
}

export interface DeleteCategoryVariables {
  input: Pick<CategoryInputBase, 'id'>;
}

export interface QueryCategoryByIdVariables {
  input: Pick<CategoryInputBase, 'id'>;
}
