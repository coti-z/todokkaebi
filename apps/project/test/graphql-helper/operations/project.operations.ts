import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { BaseResponse, GraphQLTestHelper } from '../graphql.helper';

export enum ProjectQueries {
  QUERY_PROJECT = 'QUERY_PROJECT',
  QUERY_PROJECTS = 'QUERY_PROJECTS',
}

export enum ProjectMutations {
  CREATE_PROJECT = 'CREATE_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
}

export const ProjectOperations = {
  [ProjectQueries.QUERY_PROJECT]: gql`
    query QueryProject($input: QueryProjectInput!) {
      queryProject(input: $input) {
        status
        success
        message
        data {
          id
          name
          adminId
          createdAt
          updatedAt
          memberships {
            id
            userId
            role
            createdAt
            updatedAt
          }
          categories {
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
          projectInvitations {
            id
            projectId
            inviterUserId
            inviteeUserId
            status
            createdAt
            updatedAt
          }
        }
      }
    }
  `,

  [ProjectQueries.QUERY_PROJECTS]: gql`
    query QueryProjects {
      queryProjects {
        status
        success
        message
        data {
          projects {
            id
            name
            adminId
            createdAt
            updatedAt
            memberships {
              id
              userId
              role
              createdAt
              updatedAt
            }
            categories {
              id
              name
              projectId
              createdAt
              updatedAt
            }
            projectInvitations {
              id
              projectId
              inviterUserId
              inviteeUserId
              status
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  `,

  [ProjectMutations.CREATE_PROJECT]: gql`
    mutation CreateProject($input: CreateProjectInput!) {
      createProject(input: $input) {
        status
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

  [ProjectMutations.UPDATE_PROJECT]: gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
      updateProject(input: $input) {
        status
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

  [ProjectMutations.DELETE_PROJECT]: gql`
    mutation DeleteProject($input: DeleteProjectInput!) {
      deleteProject(input: $input) {
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

export interface ProjectInputBase {
  projectId: string;
  name: string;

  userId: string;
}

export interface CreateProjectVariables {
  input: Pick<ProjectInputBase, 'name'>;
}

export interface UpdateProjectVariables {
  input: Pick<ProjectInputBase, 'name' | 'projectId'>;
}

export interface DeleteProjectVariables {
  input: Pick<ProjectInputBase, 'projectId'>;
}

export interface QueryProjectVariables {
  input: Pick<ProjectInputBase, 'projectId'>;
}
export interface QueryProjectsVariables {}

export class ProjectTestHelper {
  constructor(private readonly graphQLTestHelper: GraphQLTestHelper) {}

  async createProject(
    variables: CreateProjectVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectMutations.CREATE_PROJECT,
      variables,
    );
  }

  async updateProject(
    variables: UpdateProjectVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectMutations.UPDATE_PROJECT,
      variables,
    );
  }

  async deleteProject(
    variables: DeleteProjectVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectMutations.DELETE_PROJECT,
      variables,
    );
  }

  async queryProject(
    variables: QueryProjectVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeQuery(ProjectQueries.QUERY_PROJECT, variables);
  }

  async queryProjects(
    variables: QueryProjectsVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeQuery(ProjectQueries.QUERY_PROJECTS, variables);
  }

  private async executeMutation<T>(
    mutation: ProjectMutations,
    variables: Record<string, any>,
  ) {
    const document: DocumentNode = ProjectOperations[mutation];
    return await this.graphQLTestHelper.execute<T>(document, variables);
  }

  private async executeQuery<T>(
    query: ProjectQueries,
    variables: Record<string, any>,
  ) {
    const document: DocumentNode = ProjectOperations[query];
    return await this.graphQLTestHelper.execute<T>(document, variables);
  }
}
