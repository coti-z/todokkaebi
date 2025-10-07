import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { GraphQLExceptionFilter } from '@libs/filter';

import { AUTH_MUTATIONS } from '@test-e2e/graphql/auth.graphql';
import { CATEGORY_MUTATIONS } from '@test-e2e/graphql/category.graphql';
import { PROJECT_MUTATIONS } from '@test-e2e/graphql/project.graphql';
import { TASK_MUTATIONS, TASK_QUERIES } from '@test-e2e/graphql/task.graphql';
import { USER_MUTATIONS } from '@test-e2e/graphql/user.graphql';
import { GraphqlRequestHelper } from '@test-e2e/helpers/graphql-request.helper';
import { TimeHelper } from '@test-e2e/helpers/time.helper';
import { LoginResponse } from '@test-e2e/types/auth-response.types';
import { CreateCategoryResponse } from '@test-e2e/types/category-response.types';
import { CreateProjectResponse } from '@test-e2e/types/project-response.types';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  QueryTaskByIdResponse,
  QueryTasksByCategoryIdResponse,
  UpdateTaskResponse,
} from '@test-e2e/types/task-response.types';
import { CreateUserResponse } from '@test-e2e/types/user-response.types';

import { AuthModule } from '@auth/auth.module';

import { UserModule } from '@user/user.module';

import { ProjectModule } from '@project/project.module';

describe('Task Resolver (e2e)', () => {
  let app: INestApplication;
  let graphqlHelper: GraphqlRequestHelper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectModule,
        UserModule,
        AuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          path: '/graphql',
        }),
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: GraphQLExceptionFilter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    graphqlHelper = new GraphqlRequestHelper(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Task CRUD Operations', () => {
    let accessToken: string;
    let projectId: string;
    let categoryId: string;
    let createTaskId: string;

    beforeAll(async () => {
      const testUser = {
        email: `task-test-${uuid()}@email.com`,
        nickname: `task-user-${uuid()}`,
        password: 'taskTest123',
      };

      await graphqlHelper.mutate<CreateUserResponse>(
        USER_MUTATIONS.CREATE_USER,
        { input: testUser },
      );

      const loginResponse = await graphqlHelper.mutate<LoginResponse>(
        AUTH_MUTATIONS.LOGIN,
        {
          input: {
            email: testUser.email,
            password: testUser.password,
          },
        },
      );

      accessToken = loginResponse.data!.basicLogin.data.accessToken;

      const projectResponse = await graphqlHelper.mutate<CreateProjectResponse>(
        PROJECT_MUTATIONS.CREATE_PROJECT,
        {
          input: { name: `Task Test Project ${uuid()}` },
        },
        { Authorization: `Bearer ${accessToken}` },
      );

      projectId = projectResponse.data!.createProject.data!.id;

      const categoryResponse =
        await graphqlHelper.mutate<CreateCategoryResponse>(
          CATEGORY_MUTATIONS.CREATE_CATEGORY,
          {
            input: { name: `Task Test Category ${uuid()}`, projectId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

      categoryId = categoryResponse.data!.createCategory.data!.id;
    });

    describe('Create Task', () => {
      const taskTitle = `Test Task ${uuid()}`;
      // const taskDescription = `Test Description ${uuid()}`;

      it('should create task successfully with valid token', async () => {
        const { startTime, endTime } = TimeHelper.generateTimeRange();
        const response = await graphqlHelper.mutate<CreateTaskResponse>(
          TASK_MUTATIONS.CREATE_TASK,
          {
            input: {
              title: taskTitle,
              categoryId,
              startDate: startTime,
              endDate: endTime,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.createTask.success).toBe(true);
        expect(response.data?.createTask.data?.id).toBeDefined();
        expect(response.data?.createTask.data?.title).toBe(taskTitle);
        expect(response.data?.createTask.data?.categoryId).toBe(categoryId);

        createTaskId = response.data!.createTask.data!.id;
      });

      it('should fail create task without authentication token', async () => {
        const { startTime, endTime } = TimeHelper.generateTimeRange();
        const response = await graphqlHelper.mutate<CreateTaskResponse>(
          TASK_MUTATIONS.CREATE_TASK,
          {
            input: {
              title: 'Should Fail Task',
              description: 'Should Fail Description',
              status: 'TODO',
              priority: 'MEDIUM',
              categoryId,
              startDate: startTime,
              endDate: endTime,
            },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail create task with invalid token', async () => {
        const { startTime, endTime } = TimeHelper.generateTimeRange();
        const response = await graphqlHelper.mutate<CreateTaskResponse>(
          TASK_MUTATIONS.CREATE_TASK,
          {
            input: {
              title: 'Should Fail Task',
              description: 'Should Fail Description',
              status: 'TODO',
              categoryId,
              startDate: startTime,
              endDate: endTime,
            },
          },
          { Authorization: 'Bearer invalid-token' },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Query Task', () => {
      it('should query task by id successfully', async () => {
        const response = await graphqlHelper.query<QueryTaskByIdResponse>(
          TASK_QUERIES.QUERY_TASK_BY_ID,
          {
            input: { taskId: createTaskId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.queryTaskById.success).toBe(true);
        expect(response.data?.queryTaskById.data?.id).toBe(createTaskId);
        expect(response.data?.queryTaskById.data?.categoryId).toBe(categoryId);
        expect(response.data?.queryTaskById.data?.createdAt).toBeDefined();
        expect(response.data?.queryTaskById.data?.updatedAt).toBeDefined();
      });

      it('should query tasks by category id successfully', async () => {
        const response =
          await graphqlHelper.query<QueryTasksByCategoryIdResponse>(
            TASK_QUERIES.QUERY_TASKS_BY_CATEGORY_ID,
            {
              input: { categoryId },
            },
            { Authorization: `Bearer ${accessToken}` },
          );

        expect(response.errors).toBeUndefined();
        expect(response.data?.queryTasksByCategoryId.success).toBe(true);
        expect(response.data?.queryTasksByCategoryId.data?.tasks).toBeDefined();
        expect(
          Array.isArray(response.data?.queryTasksByCategoryId.data?.tasks),
        ).toBe(true);
        expect(
          response.data?.queryTasksByCategoryId.data?.tasks.length,
        ).toBeGreaterThan(0);
      });

      it('should fail query task without authentication token', async () => {
        const response = await graphqlHelper.query<QueryTaskByIdResponse>(
          TASK_QUERIES.QUERY_TASK_BY_ID,
          {
            input: { taskId: createTaskId },
          },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Update Task', () => {
      const updateTitle = `Updated Task ${uuid()}`;

      it('should update task successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<UpdateTaskResponse>(
          TASK_MUTATIONS.UPDATE_TASK,
          {
            input: {
              taskId: createTaskId,
              title: updateTitle,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.updateTask.success).toBe(true);
        expect(response.data?.updateTask.data?.id).toBe(createTaskId);

        expect(response.data?.updateTask.data?.taskStatus).toBe('PENDING');
      });

      it('should fail update task without authentication token', async () => {
        const response = await graphqlHelper.mutate<UpdateTaskResponse>(
          TASK_MUTATIONS.UPDATE_TASK,
          {
            input: {
              taskId: createTaskId,
              title: 'Should Fail Update',
              description: 'Should Fail Description',
              status: 'TODO',
            },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail update task with invalid token', async () => {
        const response = await graphqlHelper.mutate<UpdateTaskResponse>(
          TASK_MUTATIONS.UPDATE_TASK,
          {
            input: {
              taskId: createTaskId,
              title: 'Should Fail Update',
              description: 'Should Fail Description',
              status: 'TODO',
            },
          },
          {
            Authorization: 'Bearer invalid-token',
          },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Delete Task', () => {
      it('should delete task successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<DeleteTaskResponse>(
          TASK_MUTATIONS.DELETE_TASK,
          {
            input: { taskId: createTaskId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.deleteTask.success).toBe(true);
        expect(response.data?.deleteTask.data?.id).toBe(createTaskId);
      });

      it('should fail delete task without authentication token', async () => {
        const { startTime, endTime } = TimeHelper.generateTimeRange();
        const testTaskResponse = await graphqlHelper.mutate<CreateTaskResponse>(
          TASK_MUTATIONS.CREATE_TASK,
          {
            input: {
              title: `Delete Test Task ${uuid()}`,
              categoryId,
              startDate: startTime,
              endDate: endTime,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );
        const taskId = testTaskResponse.data!.createTask.data?.id;

        const response = await graphqlHelper.mutate<DeleteTaskResponse>(
          TASK_MUTATIONS.DELETE_TASK,
          {
            input: { taskId },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail delete task with invalid token', async () => {
        const { startTime: startTime2, endTime: endTime2 } =
          TimeHelper.generateTimeRange();
        const testTaskResponse = await graphqlHelper.mutate<CreateTaskResponse>(
          TASK_MUTATIONS.CREATE_TASK,
          {
            input: {
              title: `Delete Test Task ${uuid()}`,
              categoryId,
              startDate: startTime2,
              endDate: endTime2,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );
        const taskId = testTaskResponse.data!.createTask.data?.id;

        const response = await graphqlHelper.mutate<DeleteTaskResponse>(
          TASK_MUTATIONS.DELETE_TASK,
          {
            input: { taskId },
          },
          { Authorization: `Bearer invalid-token` },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Task Authorization Tests', () => {
      let user1AccessToken: string;
      let user2AccessToken: string;
      let user1ProjectId: string;
      let user1CategoryId: string;
      let user1TaskId: string;

      beforeAll(async () => {
        const user1 = {
          email: `task-auth-user-1${uuid()}@email.com`,
          nickname: `user1-${uuid()}`,
          password: 'authTest123',
        };
        const user2 = {
          email: `task-auth-user2-${uuid()}@email.com`,
          nickname: `user2-${uuid()}`,
          password: 'authTest123',
        };

        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: user1 },
        );
        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: user2 },
        );

        const user1Login = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: { email: user1.email, password: user1.password },
          },
        );
        const user2Login = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: { email: user2.email, password: user2.password },
          },
        );

        user1AccessToken = user1Login.data!.basicLogin.data.accessToken;
        user2AccessToken = user2Login.data!.basicLogin.data.accessToken;

        const createProjectResponse =
          await graphqlHelper.mutate<CreateProjectResponse>(
            PROJECT_MUTATIONS.CREATE_PROJECT,
            {
              input: { name: `User1 Task Project ${uuid()}` },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1ProjectId = createProjectResponse.data!.createProject.data!.id;

        const createCategoryResponse =
          await graphqlHelper.mutate<CreateCategoryResponse>(
            CATEGORY_MUTATIONS.CREATE_CATEGORY,
            {
              input: {
                name: `User1 Task Category ${uuid()}`,
                projectId: user1ProjectId,
              },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1CategoryId = createCategoryResponse.data!.createCategory.data!.id;

        const { startTime, endTime } = TimeHelper.generateTimeRange();
        const createTaskResponse =
          await graphqlHelper.mutate<CreateTaskResponse>(
            TASK_MUTATIONS.CREATE_TASK,
            {
              input: {
                title: `User1 Task ${uuid()}`,
                categoryId: user1CategoryId,
                startDate: startTime,
                endDate: endTime,
              },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1TaskId = createTaskResponse.data!.createTask.data!.id;
      });

      it('should fail when user2 tries to update user1 task', async () => {
        const response = await graphqlHelper.mutate<UpdateTaskResponse>(
          TASK_MUTATIONS.UPDATE_TASK,
          {
            input: {
              taskId: user1TaskId,
              title: 'Unauthorized Update',
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );

        expect(response.errors).toBeDefined();
      });

      it('should fail when user2 tries to delete user1 task', async () => {
        const response = await graphqlHelper.mutate<DeleteTaskResponse>(
          TASK_MUTATIONS.DELETE_TASK,
          {
            input: {
              taskId: user1TaskId,
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail when user2 tries to query user1 task by id', async () => {
        const response = await graphqlHelper.query<QueryTaskByIdResponse>(
          TASK_QUERIES.QUERY_TASK_BY_ID,
          {
            input: { taskId: user1TaskId },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );
        expect(response.errors).toBeDefined();
      });
    });
  });
});
