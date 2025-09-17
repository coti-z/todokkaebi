export const queries = {
  VERIFY_TOKEN: `#graphql
    query VerifyToken {
      me {
        id
        email
      }
    }
  `,
  GET_USER: `#graphql
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      email
      nickname
      createdAt
    }
  }
  `,
} as const;
