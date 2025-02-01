import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import {
  CategoryMutations,
  CategoryOperations,
  CreateCategoryVariables,
} from './graphql-helper/category.operations';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import {
  CreateProjectVariables,
  ProjectMutations,
  ProjectOperations,
} from './graphql-helper/project.operations';
import {
  CreateTaskVariables,
  DeleteTaskVariables,
  QueryTasksVariables,
  QueryTaskVariables,
  TaskMutations,
  TaskOperations,
  TaskQueries,
  UpdateTaskVariables,
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

    it('query task by taskId', async () => {
      const variables: QueryTaskVariables = {
        input: {
          id: createdTaskId,
        },
      };

      const response = await graphQLTestHelper.execute(
        TaskOperations[TaskQueries.QUERY_TASK],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('title', 'Test Task');
    });

    it('query task by categoryId', async () => {
      const variables: QueryTasksVariables = {
        input: {
          categoryId: createdCategoryId,
        },
      };

      const response = await graphQLTestHelper.execute(
        TaskOperations[TaskQueries.QUERY_TASKS],
        variables,
      );
      expect(response.success).toBe(true);
    });

    it('should update task', async () => {
      const variables: UpdateTaskVariables = {
        input: {
          id: createdTaskId,
          check: true,
        },
      };
      const response = await graphQLTestHelper.execute(
        TaskOperations[TaskMutations.UPDATE_TASK],
        variables,
      );
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('check', true);
    });

    it('should delete task', async () => {
      const variables: DeleteTaskVariables = {
        input: {
          id: createdTaskId,
        },
      };

      const response = await graphQLTestHelper.execute(
        TaskOperations[TaskMutations.DELETE_TASK],
        variables,
      );

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('id', createdTaskId);
    });
  });
});
