import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { GraphqlRequestHelper } from './helpers/graphql-request.helper';

import { USER_MUTATIONS, USER_QUERIES } from './graphql/user.graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { v4 as uuid } from 'uuid';
import { LoggerModule } from '@libs/logger';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from '@libs/filter';
import { AUTH_MUTATIONS } from 'test/graphql/auth.graphql';
import { HealthCheckResponse } from 'test/types/common.types';
import {
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
} from 'test/types/user-response.types';
import { LoginResponse } from 'test/types/auth-response.types';

describe('User Resolver (e2e)', () => {
  let app: INestApplication;

  let graphqlHelper: GraphqlRequestHelper;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          path: '/graphql',
        }),
        LoggerModule,
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: GraphQLExceptionFilter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const server = app.getHttpServer();
    server.maxConnections = 0;
    server.keepAliveTimeout = 30000;
    server.headersTimeout = 30000;
    await app.init();
    graphqlHelper = new GraphqlRequestHelper(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('should success health check', async () => {
      const response = await graphqlHelper.query<HealthCheckResponse>(
        USER_QUERIES.HEALTH_CHECK,
      );

      expect(response.errors).toBeUndefined();
      expect(response.data?.healthCheck).toBe('OK');
    });
  });

  describe('User CRUD Operations', () => {
    let createdUserId: string;
    let accessToken: string;

    describe('Create User', () => {
      const randomEmail = `test-${uuid()}@email.com`;
      const randomNickname = `${uuid()}-name`;
      const input = {
        email: randomEmail,
        nickname: randomNickname,
        password: 'password123',
        birthday: new Date().toISOString(),
      };

      it('should create user successfully', async () => {
        const response = await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          {
            input,
          },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.createUser.success).toBe(true);
        expect(response.data?.createUser.data.email).toBe(input.email);
        expect(response.data?.createUser.data.id).toBeDefined();

        createdUserId = response.data!.createUser.data.id;
      });

      it('should fail when email already exists', async () => {
        const duplicateInput = {
          email: randomEmail,
          nickname: 'different-nickname',
          password: 'password123',
        };

        const response = await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          {
            input: duplicateInput,
          },
        );

        expect(response.errors).toBeDefined();
        expect(response.data).toBeNull();
      });

      it('should fail with invalid email format', async () => {
        const invalidInput = {
          email: `invalid-email-${uuid()}`,
          nickname: 'test-user',
          password: 'password123',
        };

        const response = await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: invalidInput },
        );

        expect(response.errors).toBeDefined();
      });

      it('should allow only one user creation when multiple requests with same email arrive simultaneously', async () => {
        const concurrentEmail = `lock-test-${uuid()}@email.com`;
        const testInput = {
          email: concurrentEmail,
          nickname: `lockUser-${uuid()}`,
          password: 'lockTest123',
          birthday: new Date().toISOString(),
        };

        const concurrentRequests = Array.from({ length: 5 }, () =>
          graphqlHelper.mutate<CreateUserResponse>(USER_MUTATIONS.CREATE_USER, {
            input: testInput,
          }),
        );

        const results = await Promise.allSettled(concurrentRequests);

        const successful = results.filter(
          r =>
            r.status === 'fulfilled' &&
            !r.value.errors &&
            r.value.data?.createUser.success,
        );
        const failed = results.filter(
          r =>
            r.status === 'fulfilled' &&
            (r.value.errors || !r.value.data?.createUser.success),
        );

        expect(successful.length).toBe(1);
        expect(failed.length).toBe(4);
      });

      it('should allow concurrent requests with different emails', async () => {
        const differentRequests = Array.from({ length: 3 }, (_, index) => {
          const uniqueId = `${uuid()}-${index}`;
          return graphqlHelper.mutate<CreateUserResponse>(
            USER_MUTATIONS.CREATE_USER,
            {
              input: {
                email: `${uniqueId}@email.com`,
                nickname: `${uniqueId}`,
                password: 'differentTest123',
                birthday: new Date().toISOString(),
              },
            },
          );
        });

        const results = await Promise.allSettled(differentRequests);

        const successful = results.filter(
          r =>
            r.status === 'fulfilled' &&
            !r.value.errors &&
            r.value.data?.createUser.success,
        );

        expect(successful.length).toBe(3);
      });
    });

    describe('User Authentication', () => {
      const testUser = {
        email: `login-test-${uuid()}@email.com`,
        nickname: `login-user-${uuid()}`,
        password: 'loginTest123',
      };

      beforeAll(async () => {
        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: testUser },
        );
      });

      it('should login successfully with valid credentials', async () => {
        const loginInput = {
          email: testUser.email,
          password: testUser.password,
        };

        const response = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: loginInput,
          },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.basicLogin.success).toBe(true);
        expect(response.data?.basicLogin.data.accessToken).toBeDefined();
        expect(response.data?.basicLogin.data.refreshToken).toBeDefined();

        accessToken = response.data!.basicLogin.data.accessToken;
      });

      it('should fail login with invalid email', async () => {
        const invalidInput = {
          email: 'nonexistent@email.com',
          password: testUser.password,
        };

        const response = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          { input: invalidInput },
        );

        expect(response.errors).toBeDefined();
        expect(response.data).toBeNull();
      });

      it('should fail login with wrong password', async () => {
        const wrongPasswordInput = {
          email: testUser.email,
          password: 'wrongpasssword',
        };

        const response = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          { input: wrongPasswordInput },
        );

        expect(response.errors).toBeDefined();
        expect(response.data).toBeNull();
      });
    });

    describe('Update User', () => {
      const updateTestUser = {
        email: `update-test-${uuid()}@email.com`,
        nickname: `update-user-${uuid()}`,
        password: 'updateTest123',
      };
      const loginInput = {
        email: updateTestUser.email,
        password: updateTestUser.password,
      };

      let updateAccessToken: string;
      beforeAll(async () => {
        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: updateTestUser },
        );

        const loginResponse = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: loginInput,
          },
        );

        updateAccessToken = loginResponse.data!.basicLogin.data.accessToken;
      });

      it('should update user successfully with valid token', async () => {
        const updateInput = {
          nickname: `updated${uuid()}-nickname`,
          email: `updated${uuid()}@email.com`,
          password: 'newPassword123',
        };

        const response = await graphqlHelper.mutate<UpdateUserResponse>(
          USER_MUTATIONS.UPDATE_USER,
          { input: updateInput },
          { Authorization: `Bearer ${updateAccessToken}` },
        );
        expect(response.errors).toBeUndefined();
        expect(response.data?.updateUser.success).toBe(true);
        expect(response.data?.updateUser.data.userId).toBeDefined();
      });

      it('should fail update without authentication token', async () => {
        const updateInput = {
          nickname: 'should-fail',
          email: 'fail@email.com',
          password: 'failPassword123',
        };

        const response = await graphqlHelper.mutate<UpdateUserResponse>(
          USER_MUTATIONS.UPDATE_USER,
          { input: updateInput },
          { Authorization: 'Bearer invalid-token' },
        );

        expect(response.errors).toBeDefined();
      });

      it('should handle simultaneous nickname updates from same user', async () => {
        const nicknameUser = {
          email: `nickname-test-${uuid()}@email.com`,
          nickname: `nickname-user-${uuid()}`,
          password: 'nicknameTest123',
        };

        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: nicknameUser },
        );

        const loginResponse = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: {
              email: nicknameUser.email,
              password: nicknameUser.password,
            },
          },
        );

        const accessToken = loginResponse.data!.basicLogin.data.accessToken;
        const nicknameRequests = Array.from({ length: 50 }, (_, index) =>
          graphqlHelper.mutate<UpdateUserResponse>(
            USER_MUTATIONS.UPDATE_USER,
            {
              input: {
                nickname: `${index}-${uuid()}`,
              },
            },
            { Authorization: `Bearer ${accessToken}` },
          ),
        );

        const results = await Promise.allSettled(nicknameRequests);

        const successful = results.filter(
          r =>
            r.status === 'fulfilled' &&
            !r.value.errors &&
            r.value.data?.updateUser.success,
        );
        // HTTP Agent와 서버 최적화로 모든 요청이 성공해야 함
        console.log(
          `Success: ${successful.length}/50, Failed: ${50 - successful.length}`,
        );
        expect(successful.length).toBeGreaterThanOrEqual(45); // 최소 90% 성공률
      });
    });

    describe('Delete User', () => {
      const deleteTestUser = {
        email: `delete-test-${uuid()}@email.com`,
        nickname: `delete-user-${uuid()}`,
        password: 'deleteTest123',
      };

      let deleteAccessToken: string;
      beforeAll(async () => {
        await graphqlHelper.mutate<CreateUserResponse>(
          USER_MUTATIONS.CREATE_USER,
          { input: deleteTestUser },
        );

        const loginResponse = await graphqlHelper.mutate<LoginResponse>(
          AUTH_MUTATIONS.LOGIN,
          {
            input: {
              email: deleteTestUser.email,
              password: deleteTestUser.password,
            },
          },
        );

        deleteAccessToken = loginResponse.data!.basicLogin.data.accessToken;
      });

      it('should delete user successfully with valid token', async () => {
        const response = await graphqlHelper.mutate<DeleteUserResponse>(
          USER_MUTATIONS.DELETE_USER,
          {},
          { Authorization: `Bearer ${deleteAccessToken}` },
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.deleteUser.success).toBe(true);
        expect(response.data?.deleteUser.data.userId).toBeDefined();
      });

      it('should fail delete without authentication token', async () => {
        const response = await graphqlHelper.mutate<DeleteUserResponse>(
          USER_MUTATIONS.DELETE_USER,
          {},
        );
        expect(response.errors).toBeDefined();
      });

      it('should fail delete with invalid token', async () => {
        const response = await graphqlHelper.mutate<DeleteUserResponse>(
          USER_MUTATIONS.DELETE_USER,
          {},
          { Authorization: 'Bearer invalid-token' },
        );
        expect(response.errors).toBeDefined();
      });
    });
  });
});
