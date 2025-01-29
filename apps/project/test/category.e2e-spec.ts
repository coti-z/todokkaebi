import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import {
  CategoryMutations,
  CategoryOperations,
  CategoryQueries,
  CreateCategoryVariables,
  DeleteCategoryVariables,
  QueryCategoryByIdVariables,
  UpdateCategoryVariables,
} from './graphql-helper/category.operations';
import {
  CreateProjectVariables,
  ProjectMutations,
  ProjectOperations,
} from './graphql-helper/project.operations';
import { ProjectModule } from '@project/project.module';

describe('CategoryResolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let createdCategoryId: string;
  let createdProjectId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    graphQLTestHelper = new GraphQLTestHelper(app);

    // 테스트용 프로젝트 생성
    const projectVariables: CreateProjectVariables = {
      input: { name: 'Test Project for Category' },
    };

    const projectResponse = await graphQLTestHelper.execute(
      ProjectOperations[ProjectMutations.CREATE_PROJECT],
      projectVariables,
    );

    createdProjectId = projectResponse.data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Category Operations', () => {
    beforeAll(async () => {
      const variables: CreateCategoryVariables = {
        input: {
          name: 'Test Category',
          projectId: createdProjectId,
        },
      };

      const response = await graphQLTestHelper.execute(
        CategoryOperations[CategoryMutations.CREATE_CATEGORY],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'Test Category');
      expect(response.data).toHaveProperty('projectId', createdProjectId);

      createdCategoryId = response.data.id;
    });

    it('should query a created category', async () => {
      const variables: QueryCategoryByIdVariables = {
        input: { id: createdCategoryId },
      };

      const response = await graphQLTestHelper.execute(
        CategoryOperations[CategoryQueries.QUERY_CATEGORY],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdCategoryId);
      expect(response.data).toHaveProperty('name', 'Test Category');
      expect(response.data).toHaveProperty('projectId', createdProjectId);
      expect(response.data).toHaveProperty('tasks');
      expect(Array.isArray(response.data.tasks)).toBe(true);
    });

    it('should update the category', async () => {
      const variables: UpdateCategoryVariables = {
        input: {
          id: createdCategoryId,
          name: 'Updated Test Category',
          projectId: createdProjectId,
        },
      };

      const response = await graphQLTestHelper.execute(
        CategoryOperations[CategoryMutations.UPDATE_CATEGORY],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdCategoryId);
      expect(response.data).toHaveProperty('name', 'Updated Test Category');
      expect(response.data).toHaveProperty('projectId', createdProjectId);
    });

    it('should delete the category', async () => {
      const variables: DeleteCategoryVariables = {
        input: { id: createdCategoryId },
      };

      const response = await graphQLTestHelper.execute(
        CategoryOperations[CategoryMutations.DELETE_CATEGORY],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdCategoryId);
    });

    it('should fail to query deleted category', async () => {
      const variables: QueryCategoryByIdVariables = {
        input: { id: createdCategoryId },
      };

      try {
        await graphQLTestHelper.execute(
          CategoryOperations[CategoryQueries.QUERY_CATEGORY],
          variables,
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
