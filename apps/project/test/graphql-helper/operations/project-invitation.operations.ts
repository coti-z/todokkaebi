import { gql } from 'graphql-tag';
import { BaseResponse, GraphQLTestHelper } from '../graphql.helper';
import { DocumentNode } from 'graphql';

export enum ProjectInvitationMutations {
  CREATE_PROJECT_INVITATION = 'CREATE_PROJECT_INVITATION',
  UPDATE_PROJECT_INVITATION = 'UPDATE_PROJECT_INVITATION',
  ACCEPT_PROJECT_INVITATION = 'ACCEPT_PROJECT_INVITATION',
  REJECT_PROJECT_INVITATION = 'REJECT_PROJECT_INVITATION',
}

export const ProjectInvitationOperations = {
  [ProjectInvitationMutations.CREATE_PROJECT_INVITATION]: gql`
    mutation CreateProjectInvitation($input: CreateProjectInvitationInput!) {
      createProjectInvitation(input: $input) {
        status
        success
        message
        data {
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
  `,
  [ProjectInvitationMutations.UPDATE_PROJECT_INVITATION]: gql`
    mutation UpdateProjectInvitation($input: UpdateProjectInvitationInput!) {
      updateProjectInvitation(input: $input) {
        status
        success
        message
        data {
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
  `,
  [ProjectInvitationMutations.ACCEPT_PROJECT_INVITATION]: gql`
    mutation AcceptProjectInvitation($input: AcceptProjectInvitationInput!) {
      acceptProjectInvitation(input: $input) {
        status
        success
        message
        data {
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
  `,
  [ProjectInvitationMutations.REJECT_PROJECT_INVITATION]: gql`
    mutation RejectProjectInvitation($input: RejectProjectInvitationInput!) {
      rejectProjectInvitation(input: $input) {
        status
        success
        message
        data {
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
  `,
};

export interface ProjectInvitationInputBase {
  id: string;
  projectId: string;
  inviterUserId: string;
  inviteeUserId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface CreateProjectInvitationVariables {
  input: Pick<ProjectInvitationInputBase, 'inviteeUserId' | 'projectId'>;
}

export interface UpdateProjectInvitationVariables {
  input: Pick<ProjectInvitationInputBase, 'id' | 'status'>;
}

export interface AcceptProjectInvitationVariables {
  input: Pick<ProjectInvitationInputBase, 'id'>;
}

export interface RejectProjectInvitationVariables {
  input: Pick<ProjectInvitationInputBase, 'id'>;
}

export class ProjectInvitationTestHelper {
  constructor(private readonly graphQLTestHelper: GraphQLTestHelper) {}

  async createProjectInvitation(
    variables: CreateProjectInvitationVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectInvitationMutations.CREATE_PROJECT_INVITATION,
      variables,
    );
  }

  async acceptProjectInvitation(
    variables: AcceptProjectInvitationVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectInvitationMutations.ACCEPT_PROJECT_INVITATION,
      variables,
    );
  }

  async rejectProjectInvitation(
    variables: RejectProjectInvitationVariables,
  ): Promise<BaseResponse<any>> {
    return await this.executeMutation(
      ProjectInvitationMutations.REJECT_PROJECT_INVITATION,
      variables,
    );
  }

  private async executeMutation<T>(
    mutation: ProjectInvitationMutations,
    variables: Record<string, any>,
  ) {
    const document: DocumentNode = ProjectInvitationOperations[mutation];
    return await this.graphQLTestHelper.execute<T>(document, variables);
  }
}
