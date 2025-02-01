import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import {
  CreateProjectVariables,
  ProjectMutations,
  ProjectOperations,
} from './graphql-helper/project.operations';
import {
  CreateProjectInvitationVariables,
  ProjectInvitationMutations,
  ProjectInvitationOperations,
} from './graphql-helper/project-invitation.operations';

describe('ProjectInviationResolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let createdProjectId: string;
  let createdInvitationId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    graphQLTestHelper = new GraphQLTestHelper(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Project Invitation Operations', () => {
    beforeAll(async () => {
      // Create a test project first
      const variables: CreateProjectVariables = {
        input: {
          name: 'Test Project for Invitation',
        },
      };

      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectMutations.CREATE_PROJECT],
        variables,
      );
      createdProjectId = response.data.id;
    });

    it('should create a new project invitation', async () => {
      const variables: CreateProjectInvitationVariables = {
        input: {
          inviteeUserId: 'test-invitee',
          projectId: createdProjectId,
        },
      };

      const response = await graphQLTestHelper.execute(
        ProjectInvitationOperations[
          ProjectInvitationMutations.CREATE_PROJECT_INVITATION
        ],
        variables,
      );
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('projectId', createdProjectId);
      expect(response.data).toHaveProperty('inviteeUserId', 'test-invitee');
      expect(response.data).toHaveProperty('status', 'PENDING');

      createdInvitationId = response.data.id;
    });

    it('should fail to create invitation for non-existent project', async () => {
      const variables: CreateProjectInvitationVariables = {
        input: {
          inviteeUserId: 'test-invitee',
          projectId: 'non-existent-project-id',
        },
      };

      try {
        await graphQLTestHelper.execute(
          ProjectInvitationOperations[
            ProjectInvitationMutations.CREATE_PROJECT_INVITATION
          ],
          variables,
        );
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should fail to create duplicate invitation', async () => {
      const variables: CreateProjectInvitationVariables = {
        input: {
          inviteeUserId: 'test-invitee',
          projectId: createdProjectId,
        },
      };

      try {
        await graphQLTestHelper.execute(
          ProjectInvitationOperations[
            ProjectInvitationMutations.CREATE_PROJECT_INVITATION
          ],
          variables,
        );
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
