export const mutations = {
  CREATE_USER: `#graphql
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        success
        message
        data {
          id
          email
          nickname
          createdAt
        }
      }
    }
  `,

  LOGIN: `#graphql
    mutation BasicLogin($input: LoginInput!) {
      basicLogin(input: $input) {
        success
        message
        data {
          userId
          accessToken
          refreshToken
        }
      }
    }
  `,

  DELETE_USER: `#graphql
    mutation DeleteUser($userId: ID!) {
      deleteUser(userId: $userId) {
        success
        message
      }
    }
  `,
} as const;
