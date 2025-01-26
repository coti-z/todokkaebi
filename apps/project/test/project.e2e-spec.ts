import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '../src/project.module';
import {
  CreateProjectVariables,
  DeleteProjectVariables,
  ProjectMutations,
  ProjectQueries,
  QueryProjectVariables,
  UpdateProjectVariables,
} from './helpers/graphql-resolver.enum';
import { GraphQLTestHelper } from './helpers/graphql.helper';

describe('Project Resolver (e2e)', () => {
  let app: INestApplication;
  let graphqlHelper: GraphQLTestHelper;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    graphqlHelper = new GraphQLTestHelper(app);

    await app.init();
  });

  describe('create project', () => {
    it('should create a new project', async () => {
      const result = await graphqlHelper.mutation<any, CreateProjectVariables>(
        ProjectMutations.CREATE_PROJECT,
        {
          input: {
            name: 'test project',
          },
        },
      );

      expect(result.createProject.success).toBe(true);
      expect(result.createProject.data).toMatchObject({
        name: 'test project',
        adminId: expect.any(String),
      });
    });
  });

  describe('delete Project', () => {
    it('should delete a project successfully', async () => {
      // Given: 삭제할 프로젝트 생성
      const { createProject } = await graphqlHelper.mutation<
        any,
        CreateProjectVariables
      >(ProjectMutations.CREATE_PROJECT, {
        input: {
          name: 'test project',
        },
      });

      expect(createProject.success).toBe(true);
      const projectId = createProject.data.id;

      // When: 프로젝트 삭제
      const { deleteProject } = await graphqlHelper.mutation<
        any,
        DeleteProjectVariables
      >(ProjectMutations.DELETE_PROJECT, {
        input: {
          projectId,
        },
      });

      // Then: 삭제 성공 확인
      expect(deleteProject.success).toBe(true);
      expect(deleteProject.data.id).toBe(projectId);
    });

    it('should fail when deleting non-existent project', async () => {
      // When & Then: 존재하지 않는 프로젝트 삭제 시도
      await expect(
        graphqlHelper.mutation<any, DeleteProjectVariables>(
          ProjectMutations.DELETE_PROJECT,
          {
            input: {
              projectId: 'non-existent-id',
            },
          },
        ),
      ).rejects.toThrow();
    });
  });

  describe('update Project', () => {
    // Add test cases here
    it('should update project', async () => {
      // given
      const createResult = await graphqlHelper.mutation<
        any,
        CreateProjectVariables
      >(ProjectMutations.CREATE_PROJECT, {
        input: {
          name: 'create project name',
        },
      });

      expect(createResult.createProject.success).toBe(true);

      // when
      const projectId = createResult.createProject.data.id;
      const updateResult = await graphqlHelper.mutation<
        any,
        UpdateProjectVariables
      >(ProjectMutations.UPDATE_PROJECT, {
        input: {
          name: 'update project name',
          projectId: projectId,
        },
      });

      // then
      expect(updateResult.updateProject.success).toBe(true);
    });
  });

  describe('query project', () => {
    it('should query project', async () => {
      // given
      const createResult = await graphqlHelper.mutation<
        any,
        CreateProjectVariables
      >(ProjectMutations.CREATE_PROJECT, {
        input: {
          name: 'create project name',
        },
      });

      expect(createResult.createProject.success).toBe(true);

      // when
      const projectId = createResult.createProject.data.id;
      const queryResult = await graphqlHelper.query<any, QueryProjectVariables>(
        ProjectQueries.QUERY_PROJECT,
        {
          input: {
            projectId: projectId,
          },
        },
      );

      // then
      expect(queryResult.queryProject.success).toBe(true);
    });

    it('should query projects', async () => {
      // given
      const createResult = await graphqlHelper.mutation<
        any,
        CreateProjectVariables
      >(ProjectMutations.CREATE_PROJECT, {
        input: {
          name: 'create project name',
        },
      });

      expect(createResult.createProject.success).toBe(true);

      const queryResult = await graphqlHelper.query<any, QueryProjectVariables>(
        ProjectQueries.QUERY_PROJECTS,
      );

      expect(queryResult.queryProjects.success).toBe(true);
    });
  });
});
