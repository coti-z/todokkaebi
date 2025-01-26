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

export enum CategoryMutations {
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
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

  [CategoryMutations.CREATE_CATEGORY]: `
    mutation CreateCategory($input: CreateCategoryInput!) {
      createCategory(input: $input) {
        success
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

  [CategoryMutations.UPDATE_CATEGORY]: `
    mutation UpdateCategory($input: UpdateCategoryInput!) {
      updateCategory(input: $input) {
        success
        data {
          id
          name
          projectId
          createdAt
          updatedAt
          tasks {
            id
            title
            status
          }
        }
      }
    }
  `,

  [CategoryMutations.DELETE_CATEGORY]: `
    mutation DeleteCategory($input: DeleteCategoryInput!) {
      deleteCategory(input: $input) {
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

export interface CreateCategoryVariables {
  input: {
    name: string;
    projectId: string;
  };
}

export interface UpdateCategoryVariables {
  input: {
    id: string;
    name: string;
    projectId: string;
  };
}

export interface DeleteCategoryVariables {
  input: {
    id: string;
  };
}
