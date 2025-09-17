export const PROJECT_MUTATIONS = {
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
  UPDATE_PROJECT: `#graphql
        mutation UpdateProject($input: UpdateProjectInput!) {
            updateProject(input: $input) {
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
  DELETE_PROJECT: `#graphql
        mutation DeleteProject($input: DeleteProjectInput!) {
            deleteProject(input: $input) {
                success
                message
                data {
                    id
                }
            }
        }
    `,
};

export const PROJECT_QUERIES = {
  HEALTH_CHECK: `#graphql
        query {
            healthCheck
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
                    updatedAt
                    createdAt
                    memberships {
                        id
                        role
                    }
                    categories {
                        id
                        name
                    }
                    projectInvitations {
                        id
                        status
                    }
                }
            }
        }
    `,
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
};
