import { gql } from 'graphql-tag';

export enum ProjectInvitationMutations {
  CREATE_PROJECT_INVITATION = 'CREATE_PROJECT_INVITATION',
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
};

export interface ProjectInvitationInputBase {
  projectId: string;
  inviterUserId: string;
  inviteeUserId: string;
}

export interface CreateProjectInvitationVariables {
  input: Pick<ProjectInvitationInputBase, 'inviteeUserId' | 'projectId'>;
}
