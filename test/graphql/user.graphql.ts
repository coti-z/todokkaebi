export const USER_MUTATIONS = {
  CREATE_USER: `#graphql
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      data {
        id
        email
        nickname
        birthday
        createdAt
        updatedAt
      }
    }
  }
  `,

  UPDATE_USER: `#graphql
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      message
      data {
        userId
      }
    }
  }
  `,

  DELETE_USER: `#graphql
  mutation DeleteUser {
    deleteUser {
      success
      message
      data {
        userId
      }
    }
  }
  `,
};

export const USER_QUERIES = {
  HEALTH_CHECK: `#graphql
  query {
    healthCheck
  }
  `,
};
