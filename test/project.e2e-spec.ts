import { AuthModule } from '@auth/auth.module';
import { GraphQLExceptionFilter } from '@libs/filter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import { UserModule } from '@user/user.module';
import { AUTH_MUTATIONS } from 'test/graphql/auth.graphql';
import {
  PROJECT_MUTATIONS,
  PROJECT_QUERIES,
} from 'test/graphql/project.graphql';
import { USER_MUTATIONS } from 'test/graphql/user.graphql';
import { GraphqlRequestHelper } from 'test/helpers/graphql-request.helper';
import { LoginResponse } from 'test/types/auth-response.types';
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  QueryProjectResponse,
  QueryProjectsResponse,
  UpdateProjectResponse,
} from 'test/types/project-response.types';
import { CreateUserResponse } from 'test/types/user-response.types';
import { v4 as uuid } from 'uuid';

describe('Project Resolver (e2e)', () => {
  let app: INestApplication;
  let graphqlHelper: GraphqlRequestHelper;
  let testUser: { userId: string; accessToken: string };

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

  describe('Health Check', () => {
    it('should success health check', async () => {
      const response = await graphqlHelper.query(PROJECT_QUERIES.HEALTH_CHECK);

      expect(response.errors).toBeUndefined();
      expect(response.data?.healthCheck).toBe('OK');
    });
  });

  describe('Project CRUD Operations', () => {
    let accessToken: string;
    let createProjectId: string;

    beforeAll(async () => {
      const testUser = {
        email: `project-test-${uuid()}@email.com`,
        nickname: `project-user-${uuid()}`,
        password: 'projectTest123',
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
    });

    describe('Create Project', () => {
      const projectName = `Test Project ${uuid()}`;

      it('should create project successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<CreateProjectResponse>(
          PROJECT_MUTATIONS.CREATE_PROJECT,
          {
            input: { name: projectName },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.createProject.success).toBe(true);
        expect(response.data?.createProject.data?.id).toBeDefined();
        expect(response.data?.createProject.data?.name).toBe(projectName);
        expect(response.data?.createProject.data?.adminId).toBeDefined();

        createProjectId = response.data!.createProject.data!.id;
      });

      it('should fail create project without authentication token', async () => {
        const response = await graphqlHelper.mutate<CreateProjectResponse>(
          PROJECT_MUTATIONS.CREATE_PROJECT,
          {
            input: {
              name: 'Should Fail Project',
            },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail create project with invalid token', async () => {
        const response = await graphqlHelper.mutate<CreateProjectResponse>(
          PROJECT_MUTATIONS.CREATE_PROJECT,
          {
            input: { name: 'Should Fail Project' },
          },
          { Authorization: 'Bearer invalid-token' },
        );
      });
    });

    describe('Query Project', () => {
      it('should query single project successfully', async () => {
        const response = await graphqlHelper.query<QueryProjectResponse>(
          PROJECT_QUERIES.QUERY_PROJECT,
          {
            input: { projectId: createProjectId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.queryProject.success).toBe(true);
        expect(response.data?.queryProject.data?.id).toBe(createProjectId);
        expect(response.data?.queryProject.data?.memberships).toBeDefined();
        expect(response.data?.queryProject.data?.categories).toBeDefined();
        expect(
          response.data?.queryProject.data?.projectInvitations,
        ).toBeDefined();
      });

      it('should query projects list successfully', async () => {
        const response = await graphqlHelper.query<QueryProjectsResponse>(
          PROJECT_QUERIES.QUERY_PROJECTS,
          {},
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.queryProjects.success).toBe(true);
        expect(response.data?.queryProjects.data).toBeDefined();
        expect(response.data?.queryProjects.data?.projects).toBeDefined();
      });

      it('should query projects list successfully', async () => {
        const response = await graphqlHelper.query<QueryProjectsResponse>(
          PROJECT_QUERIES.QUERY_PROJECTS,
          {},
          { Authorization: `Bearer ${accessToken}` },
        );
        expect(response.errors).toBeUndefined();
        expect(response.data?.queryProjects.success).toBe(true);
        expect(Array.isArray(response.data?.queryProjects.data?.projects)).toBe(
          true,
        );
        expect(
          response.data?.queryProjects.data?.projects.length,
        ).toBeGreaterThan(0);
      });
    });

    describe('Update Project', () => {
      const updateName = `Update Project ${uuid()}`;

      it('should update project successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<UpdateProjectResponse>(
          PROJECT_MUTATIONS.UPDATE_PROJECT,
          {
            input: {
              projectId: createProjectId,
              name: updateName,
            },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.updateProject.success).toBe(true);
        expect(response.data?.updateProject.data?.id).toBe(createProjectId);
        expect(response.data?.updateProject.data?.name).toBe(updateName);
      });

      it('should fail update without authentication token', async () => {
        const response = await graphqlHelper.mutate<UpdateProjectResponse>(
          PROJECT_MUTATIONS.UPDATE_PROJECT,
          {
            input: {
              projectId: createProjectId,
              name: 'Should Fail Update',
            },
          },
        );
        expect(response.errors).toBeDefined();
      });
      it('should fail update project with invalid token', async () => {
        const response = await graphqlHelper.mutate<UpdateProjectResponse>(
          PROJECT_MUTATIONS.UPDATE_PROJECT,
          {
            input: {
              projectId: createProjectId,
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

    describe('Delete Project', () => {
      it('should delete project successfully with with valid token', async () => {
        const response = await graphqlHelper.mutate<DeleteProjectResponse>(
          PROJECT_MUTATIONS.DELETE_PROJECT,
          {
            input: { projectId: createProjectId },
          },
          { Authorization: `Bearer ${accessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.deleteProject.success).toBe(true);
        expect(response.data?.deleteProject.data?.id).toBe(createProjectId);
      });

      it('should fail delete project without authentication token', async () => {
        const testProject = {
          name: `Delete Test Project ${uuid()}`,
        };

        const createResponse =
          await graphqlHelper.mutate<CreateProjectResponse>(
            PROJECT_MUTATIONS.CREATE_PROJECT,
            { input: testProject },
            { Authorization: `Bearer ${accessToken}` },
          );
        const projectId = createResponse.data!.createProject.data?.id;
        const response = await graphqlHelper.mutate<DeleteProjectResponse>(
          PROJECT_MUTATIONS.DELETE_PROJECT,
          {
            input: { projectId },
          },
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail delete project with invalid token', async () => {
        const testProject = {
          name: `Delete Test Project ${uuid()}`,
        };

        const createResponse =
          await graphqlHelper.mutate<CreateProjectResponse>(
            PROJECT_MUTATIONS.CREATE_PROJECT,
            { input: testProject },
            { Authorization: `Bearer ${accessToken}` },
          );
        const projectId = createResponse.data!.createProject.data?.id;

        const response = await graphqlHelper.mutate<DeleteProjectResponse>(
          PROJECT_MUTATIONS.DELETE_PROJECT,
          {
            input: { projectId },
          },
          { Authorization: `Bearer invalid-token` },
        );
        expect(response.errors).toBeDefined();
      });
    });

    describe('Project Authorization Tests', () => {
      let user1AccessToken: string;
      let user2AccessToken: string;
      let user1ProjectId: string | undefined;

      beforeAll(async () => {
        const user1 = {
          email: `auth-user-1${uuid()}@email.com`,
          nickname: `auth-user1-${uuid()}`,
          password: 'authTest123',
        };
        const user2 = {
          email: `auth-user2-${uuid()}@email.com`,
          nickname: `auth-user2-${uuid()}`,
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
              input: { name: `User1 Project ${uuid()}` },
            },
            { Authorization: `Bearer ${user1AccessToken}` },
          );
        user1ProjectId = createProjectResponse.data!.createProject.data?.id;
      });

      it('should fail when user2 tries to update user1 project', async () => {
        const response = await graphqlHelper.mutate<UpdateProjectResponse>(
          PROJECT_MUTATIONS.UPDATE_PROJECT,
          {
            input: {
              projectId: user1ProjectId,
              name: 'Unauthorized Update',
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );

        expect(response.errors).toBeDefined();
      });

      it('should fail when user2 tries to delete user1 project', async () => {
        const response = await graphqlHelper.mutate<DeleteProjectResponse>(
          PROJECT_MUTATIONS.DELETE_PROJECT,
          {
            input: {
              projectId: user1ProjectId,
            },
          },
          { Authorization: `Bearer ${user2AccessToken}` },
        );
        expect(response.errors).toBeDefined();
      });
    });
  });
});
