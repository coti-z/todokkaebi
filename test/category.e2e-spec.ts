import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { GraphQLExceptionFilter } from '@libs/filter';

import { AUTH_MUTATIONS } from '@test-e2e/graphql/auth.graphql';
import {
  CATEGORY_MUTATIONS,
  CATEGORY_QUERIES,
} from '@test-e2e/graphql/category.graphql';
import { PROJECT_MUTATIONS } from '@test-e2e/graphql/project.graphql';
import { USER_MUTATIONS } from '@test-e2e/graphql/user.graphql';
import { GraphqlRequestHelper } from '@test-e2e/helpers/graphql-request.helper';
import { LoginResponse } from '@test-e2e/types/auth-response.types';
import {
  ChangeCategoryNameResponse,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  QueryCategoryByIdResponse,
} from '@test-e2e/types/category-response.types';
import { CreateProjectResponse } from '@test-e2e/types/project-response.types';
import { CreateUserResponse } from '@test-e2e/types/user-response.types';

import { AuthModule } from '@auth/auth.module';

import { UserModule } from '@user/user.module';

import { ProjectModule } from '@project/project.module';

describe('Category Resolver (e2e)', () => {
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

  describe('Category CRUD Operations', () => {
    let accessToken: string;
    let projectId: string;
    let createCategoryId: string;

    beforeAll(async () => {
      const testUser = {
        email: `category-test-${uuid()}@email.com`,
        nickname: `category-user-${uuid()}`,
        password: 'categoryTest123',
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
          input: { name: `Category Test Project ${uuid()}` },
        },
        { Authorization: `Bearer ${accessToken}` },
      );

      projectId = projectResponse.data!.createProject.data!.id;
    });

    describe('Create Category', () => {
      const categoryName = `Test Category ${uuid()}`;

      it('should create category successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<CreateCategoryResponse>(
          CATEGORY_MUTATIONS.CREATE_CATEGORY,
          {
            input: { name: categoryName, projectId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.createCategory.success).toBe(true);
        expect(response.data?.createCategory.data?.id).toBeDefined();
        expect(response.data?.createCategory.data?.name).toBe(categoryName);
        expect(response.data?.createCategory.data?.projectId).toBe(projectId);

        createCategoryId = response.data!.createCategory.data!.id;
      });

      it('should fail create category without authentication token', async () => {
        const response = await graphqlHelper.mutate<CreateCategoryResponse>(
          CATEGORY_MUTATIONS.CREATE_CATEGORY,
          {
            input: {
              name: 'Should Fail Category',
              projectId,
            },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail create category with invalid token', async () => {
        const response = await graphqlHelper.mutate<CreateCategoryResponse>(
          CATEGORY_MUTATIONS.CREATE_CATEGORY,
          {
            input: { name: 'Should Fail Category', projectId },
          },
          { Authorization: 'Bearer invalid-token' },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Query Category', () => {
      it('should query category by id successfully', async () => {
        const response = await graphqlHelper.query<QueryCategoryByIdResponse>(
          CATEGORY_QUERIES.QUERY_CATEGORY_BY_ID,
          {
            input: { categoryId: createCategoryId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.queryCategoryById.success).toBe(true);
        expect(response.data?.queryCategoryById.data?.id).toBe(
          createCategoryId,
        );
        expect(response.data?.queryCategoryById.data?.projectId).toBe(
          projectId,
        );
        expect(response.data?.queryCategoryById.data?.createdAt).toBeDefined();
        expect(response.data?.queryCategoryById.data?.updatedAt).toBeDefined();
      });

      it('should fail query category without authentication token', async () => {
        const response = await graphqlHelper.query<QueryCategoryByIdResponse>(
          CATEGORY_QUERIES.QUERY_CATEGORY_BY_ID,
          {
            input: { categoryId: createCategoryId },
          },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Change Category Name', () => {
      const updateName = `Updated Category ${uuid()}`;

      it('should change category name successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<ChangeCategoryNameResponse>(
          CATEGORY_MUTATIONS.CHANGE_CATEGORY_NAME,
          {
            input: {
              categoryId: createCategoryId,
              name: updateName,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.changeCategoryName.success).toBe(true);
        expect(response.data?.changeCategoryName.data?.id).toBe(
          createCategoryId,
        );
        expect(response.data?.changeCategoryName.data?.name).toBe(updateName);
      });

      it('should fail change category name without authentication token', async () => {
        const response = await graphqlHelper.mutate<ChangeCategoryNameResponse>(
          CATEGORY_MUTATIONS.CHANGE_CATEGORY_NAME,
          {
            input: {
              categoryId: createCategoryId,
              name: 'Should Fail Update',
            },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail change category name with invalid token', async () => {
        const response = await graphqlHelper.mutate<ChangeCategoryNameResponse>(
          CATEGORY_MUTATIONS.CHANGE_CATEGORY_NAME,
          {
            input: {
              categoryId: createCategoryId,
              name: 'Should Fail Update',
            },
          },
          {
            Authorization: 'Bearer invalid-token',
          },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Delete Category', () => {
      it('should delete category successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<DeleteCategoryResponse>(
          CATEGORY_MUTATIONS.DELETE_CATEGORY,
          {
            input: { categoryId: createCategoryId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.deleteCategory.success).toBe(true);
        expect(response.data?.deleteCategory.data?.id).toBe(createCategoryId);
      });

      it('should fail delete category without authentication token', async () => {
        const testCategoryResponse =
          await graphqlHelper.mutate<CreateCategoryResponse>(
            CATEGORY_MUTATIONS.CREATE_CATEGORY,
            {
              input: { name: `Delete Test Category ${uuid()}`, projectId },
            },
            { Authorization: `Bearer ${accessToken}` },
          );
        const categoryId = testCategoryResponse.data!.createCategory.data?.id;

        const response = await graphqlHelper.mutate<DeleteCategoryResponse>(
          CATEGORY_MUTATIONS.DELETE_CATEGORY,
          {
            input: { categoryId },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail delete category with invalid token', async () => {
        const testCategoryResponse =
          await graphqlHelper.mutate<CreateCategoryResponse>(
            CATEGORY_MUTATIONS.CREATE_CATEGORY,
            {
              input: { name: `Delete Test Category ${uuid()}`, projectId },
            },
            { Authorization: `Bearer ${accessToken}` },
          );
        const categoryId = testCategoryResponse.data!.createCategory.data?.id;

        const response = await graphqlHelper.mutate<DeleteCategoryResponse>(
          CATEGORY_MUTATIONS.DELETE_CATEGORY,
          {
            input: { categoryId },
          },
          { Authorization: `Bearer invalid-token` },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Category Authorization Tests', () => {
      let user1AccessToken: string;
      let user2AccessToken: string;
      let user1ProjectId: string;
      let user1CategoryId: string;

      beforeAll(async () => {
        const user1 = {
          email: `t_user1-${uuid()}@email.com`,
          nickname: `t_user1-${uuid()}`,
          password: 'authTest123',
        };
        const user2 = {
          email: `t_user2-${uuid()}@email.com`,
          nickname: `t_user2-${uuid()}`,
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
              input: { name: `User1 Category Project ${uuid()}` },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1ProjectId = createProjectResponse.data!.createProject.data!.id;

        const createCategoryResponse =
          await graphqlHelper.mutate<CreateCategoryResponse>(
            CATEGORY_MUTATIONS.CREATE_CATEGORY,
            {
              input: {
                name: `User1 Category ${uuid()}`,
                projectId: user1ProjectId,
              },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1CategoryId = createCategoryResponse.data!.createCategory.data!.id;
      });

      it('should fail when user2 tries to update user1 category', async () => {
        const response = await graphqlHelper.mutate<ChangeCategoryNameResponse>(
          CATEGORY_MUTATIONS.CHANGE_CATEGORY_NAME,
          {
            input: {
              categoryId: user1CategoryId,
              name: 'Unauthorized Update',
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );

        expect(response.errors).toBeDefined();
      });

      it('should fail when user2 tries to delete user1 category', async () => {
        const response = await graphqlHelper.mutate<DeleteCategoryResponse>(
          CATEGORY_MUTATIONS.DELETE_CATEGORY,
          {
            input: {
              categoryId: user1CategoryId,
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );
        expect(response.errors).toBeDefined();
      });
    });
  });
});
