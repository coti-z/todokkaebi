export enum ProjectQueries {
  HEALTH_CHECK = 'HEALTH_CHECK',
  QUERY_PROJECT = 'QUERY_PROJECT',
  QUERY_PROJECTS = 'QUERY_PROJECTS',
}

export enum ProjectMutations {
  CREATE_PROJECT = 'CREATE_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
}

export const GraphQLOperations = {
  [ProjectQueries.HEALTH_CHECK]: `
    query {
      healthCheck
    }
  `,

  [ProjectQueries.QUERY_PROJECT]: `
    query QueryProject($input: QueryProjectInput!) {
      queryProject(input: $input) {
        success
        data {
          id
          name
          adminId
          categories {
            id
            name
          }
          memberships {
            id
            userId
            role
          }
        }
      }
    }
  `,

  [ProjectQueries.QUERY_PROJECTS]: `
    query QueryProjects {
      queryProjects {
        success
        data {
          projects {
            id
            name
            adminId
          }
        }
      }
    }
  `,

  [ProjectMutations.CREATE_PROJECT]: `
    mutation CreateProject($input: CreateProjectInput!) {
      createProject(input: $input) {
        success
        data {
          id
          name
          adminId
        }
      }
    }
  `,

  [ProjectMutations.UPDATE_PROJECT]: `
    mutation UpdateProject($input: UpdateProjectInput!) {
      updateProject(input: $input) {
        success
        data {
          id
          name
          adminId
        }
      }
    }
  `,

  [ProjectMutations.DELETE_PROJECT]: `
    mutation DeleteProject($input: DeleteProjectInput!) {
      deleteProject(input: $input) {
        success
        data {
          id
        }
      }
    }
  `,
};

interface ProjectInputBase {
  projectId: string;
  name: string;
}

// GraphQL Input 타입과 일치하도록 수정
export interface CreateProjectVariables {
  input: Pick<ProjectInputBase, 'name'>;
}

export interface UpdateProjectVariables {
  input: ProjectInputBase;
}

export interface DeleteProjectVariables {
  input: Pick<ProjectInputBase, 'projectId'>;
}

export interface QueryProjectVariables {
  input: Pick<ProjectInputBase, 'projectId'>;
}

export interface QueryProjectVariables {}
