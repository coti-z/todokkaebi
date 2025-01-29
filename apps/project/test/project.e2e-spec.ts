import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import {
  CreateProjectVariables,
  ProjectMutations,
  ProjectOperations,
  UpdateProjectVariables,
  DeleteProjectVariables,
  QueryProjectVariables,
  ProjectQueries,
} from './graphql-helper/project.operations';

describe('ProjectResolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let createdProjectId: string;

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

  describe('Project Operations', () => {
    it('should create a new project', async () => {
      const variables: CreateProjectVariables = {
        input: { name: 'Test Project' },
      };

      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectMutations.CREATE_PROJECT],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'Test Project');

      createdProjectId = response.data.id;
    });

    it('should query a created project', async () => {
      const variables: QueryProjectVariables = {
        input: { projectId: createdProjectId },
      };

      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectQueries.QUERY_PROJECT],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdProjectId);
      expect(response.data).toHaveProperty('name', 'Test Project');
    });

    it('should update the project', async () => {
      const variables: UpdateProjectVariables = {
        input: {
          projectId: createdProjectId,
          name: 'Updated Test Project',
        },
      };

      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectMutations.UPDATE_PROJECT],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdProjectId);
      expect(response.data).toHaveProperty('name', 'Updated Test Project');
    });

    it('should query all projects', async () => {
      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectQueries.QUERY_PROJECTS],
      );

      expect(response.success).toBe(true);
      expect(response.data.projects).toBeInstanceOf(Array);
      expect(response.data.projects.length).toBeGreaterThan(0);
    });

    it('should delete the project', async () => {
      const variables: DeleteProjectVariables = {
        input: { projectId: createdProjectId },
      };

      const response = await graphQLTestHelper.execute(
        ProjectOperations[ProjectMutations.DELETE_PROJECT],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdProjectId);
    });

    it('should fail to query deleted project', async () => {
      const variables: QueryProjectVariables = {
        input: { projectId: createdProjectId },
      };

      try {
        await graphQLTestHelper.execute(
          ProjectOperations[ProjectQueries.QUERY_PROJECT],
          variables,
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
