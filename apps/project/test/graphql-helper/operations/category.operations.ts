import { gql } from 'graphql-tag';
import { BaseResponse, GraphQLTestHelper } from '../graphql.helper';
import { DocumentNode } from 'graphql';
import { Query } from '@nestjs/common';

export enum CategoryQueries {
  QUERY_CATEGORY = 'QUERY_CATEGORY',
}

export enum CategoryMutations {
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  CHANGE_CATEGORY_NAME = 'CHANGE_CATEGORY_NAME',
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

  [CategoryMutations.CHANGE_CATEGORY_NAME]: gql`
    mutation ChangeCategoryName($input: ChangeCategoryNameInput!) {
      changeCategoryName(input: $input) {
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

export interface ChangeCategoryNameVariables {
  input: Pick<CategoryInputBase, 'id' | 'name'>;
}

export interface DeleteCategoryVariables {
  input: Pick<CategoryInputBase, 'id'>;
}

export interface QueryCategoryByIdVariables {
  input: Pick<CategoryInputBase, 'id'>;
}

export class CategoryTestHelper {
  constructor(private readonly graphQLTestHelper: GraphQLTestHelper) {}

  async createCategory(
    variables: CreateCategoryVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      CategoryMutations.CREATE_CATEGORY,
      variables,
    );
  }

  async deleteCategory(
    variables: DeleteCategoryVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      CategoryMutations.DELETE_CATEGORY,
      variables,
    );
  }

  async changeCategoryNameChange(
    variables: ChangeCategoryNameVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      CategoryMutations.CHANGE_CATEGORY_NAME,
      variables,
    );
  }

  async queryCategoryById(
    variables: QueryCategoryByIdVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeQuery(CategoryQueries.QUERY_CATEGORY, variables);
  }

  private async executeMutation<T>(
    mutation: CategoryMutations,
    variables: Record<string, any>,
  ) {
    const docuemnt: DocumentNode = CategoryOperations[mutation];
    return await this.graphQLTestHelper.execute<T>(docuemnt, variables);
  }

  private async executeQuery<T>(
    query: CategoryQueries,
    variables: Record<string, any>,
  ) {
    const document: DocumentNode = CategoryOperations[query];
    return await this.graphQLTestHelper.execute<T>(document, variables);
  }
}
