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
  CategoryMutations,
  CategoryOperations,
  CreateCategoryVariables,
} from './graphql-helper/category.operations';
import {
  CreateTaskVariables,
  TaskMutations,
  TaskOperations,
} from './graphql-helper/task.operations';
describe('TaskResolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let createdProjectId: string;
  let createdCategoryId: string;
  let createdTaskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    graphQLTestHelper = new GraphQLTestHelper(app);

    // Create test project
    const projectVariables: CreateProjectVariables = {
      input: { name: 'Test Project for Task' },
    };

    const projectResponse = await graphQLTestHelper.execute(
      ProjectOperations[ProjectMutations.CREATE_PROJECT],
      projectVariables,
    );
    createdProjectId = projectResponse.data.id;

    // Create test category
    const categoryVariables: CreateCategoryVariables = {
      input: {
        name: 'Test Category for Task',
        projectId: createdProjectId,
      },
    };

    const categoryResponse = await graphQLTestHelper.execute(
      CategoryOperations[CategoryMutations.CREATE_CATEGORY],
      categoryVariables,
    );
    createdCategoryId = categoryResponse.data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Task Operations', () => {
    beforeAll(async () => {
      const variables: CreateTaskVariables = {
        input: {
          title: 'Test Task',
          categoryId: createdCategoryId,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        },
      };

      const response = await graphQLTestHelper.execute(
        TaskOperations[TaskMutations.CREATE_TASK],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('title', 'Test Task');
      expect(response.data).toHaveProperty('categoryId', createdCategoryId);

      createdTaskId = response.data.id;
    });
  });
});
