export const Mutations = {
  CREATE_USER: `#graphql
        mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
                success
                message
                data {
                    id
                    email
                    nickname
                    createAt
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

  CREATE_PROJECT: `#graphql
    mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            success
            message
            data {
                id
                adminId
                name
            }
        }
    }
  `,
};

export const Queries = {
  QUERY_PROJECTS: `#graphql
        query QueryProjects {
            queryProjects {
                success
                message
                data {
                    projects {
                        id
                        adminId
                        name
                        updatedAt
                        createdAt
                    }
                }
            }
        }
    `,
  QUERY_PROJECT: `#graphql
        query QueryProject($input: QueryProjectInput!) {
            queryProject(input: $input) {
                success
                message
                data {
                    id
                    adminId
                    name
                    memberships {
                        id
                        role
                    }
                    categories {
                        id
                        name
                    }
                }
            }
        }
    `,
};
