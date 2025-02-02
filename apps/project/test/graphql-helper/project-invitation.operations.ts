import { ProjectInvitationBaseInput } from '@project/presentation/resolver/input/project-invitation.input';
import { gql } from 'graphql-tag';

export enum ProjectInvitationMutations {
  CREATE_PROJECT_INVITATION = 'CREATE_PROJECT_INVITATION',
  UPDATE_PROJECT_INVITATION = 'UPDATE_PROJECT_INVITATION',
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
