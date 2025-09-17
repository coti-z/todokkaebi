export const CATEGORY_MUTATIONS = {
  CREATE_CATEGORY: `#graphql
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            success
            message
            data {
                id
                name
                projectId
            }
        }
    }
    `,
  DELETE_CATEGORY: `#graphql
        mutation DeleteCategory($input: DeleteCategoryInput!) {
            deleteCategory(input: $input) {
                success
                message
                data {
                    id
                }
            }
        }
    `,
  CHANGE_CATEGORY_NAME: `#graphql
        mutation ChangeCategoryName($input: ChangeCategoryNameInput!) {
            changeCategoryName(input: $input) {
                success
                message
                data {
                    id
                    name
                }
            }
        }
    `,
};

export const CATEGORY_QUERIES = {
  QUERY_CATEGORY_BY_ID: `#graphql
        query QueryCategoryById($input: QueryCategoryByIdInput!) {
            queryCategoryById(input: $input) {
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
};
