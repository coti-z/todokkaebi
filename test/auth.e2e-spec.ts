import { AuthModule } from '@auth/auth.module';
import { GraphQLExceptionFilter } from '@libs/filter';
import { LoggerModule } from '@libs/logger';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@user/user.module';
import { AUTH_MUTATIONS } from 'test/graphql/auth.graphql';
import { USER_MUTATIONS } from 'test/graphql/user.graphql';
import { GraphqlRequestHelper } from 'test/helpers/graphql-request.helper';
import {
  LoginResponse,
  LogoutResponse,
  ReissueTokenResponse,
} from 'test/types/auth-response.types';
import { v4 as uuid } from 'uuid';

describe('Auth Resolver (e2e)', () => {
  let app: INestApplication;
  let graphqlHelper: GraphqlRequestHelper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
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
    await app.init();
    graphqlHelper = new GraphqlRequestHelper(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Basic Login/Logout Flow', () => {
    const testUser = {
      email: `auth-test-${uuid()}@test.com`,
      nickname: `auth-user-${uuid()}`,
      password: 'authTest123',
    };
    let accessToken: string;
    let refreshToken: string;

    beforeAll(async () => {
      await graphqlHelper.mutate(USER_MUTATIONS.CREATE_USER, {
        input: testUser,
      });
      const response = await graphqlHelper.mutate<LoginResponse>(
        AUTH_MUTATIONS.LOGIN,
        {
          input: {
            email: testUser.email,
            password: testUser.password,
          },
        },
      );

      expect(response.data?.basicLogin.success).toBe(true);
      expect(response.data?.basicLogin.data.accessToken).toBeDefined();
      expect(response.errors).toBeUndefined();
      expect(response.data?.basicLogin.data.refreshToken).toBeDefined();

      accessToken = response.data!.basicLogin.data.accessToken;
      refreshToken = response.data!.basicLogin.data.refreshToken;
    });

    it('should reissue token successfully', async () => {
      const response = await graphqlHelper.mutate<ReissueTokenResponse>(
        AUTH_MUTATIONS.REISSUE_TOKEN,
        {
          input: {
            refreshToken: refreshToken,
          },
        },
      );

      expect(response.errors).toBeUndefined();
      expect(response.data?.reissueToken.success).toBe(true);
      expect(response.data?.reissueToken.data.accessToken).toBeDefined();
      expect(response.data?.reissueToken.data.refreshToken).toBeDefined();
    });
    it('should logout successfully', async () => {
      const response = await graphqlHelper.mutate<LogoutResponse>(
        AUTH_MUTATIONS.LOGOUT,
        {
          input: {
            refreshToken: refreshToken,
          },
        },
      );

      expect(response.errors).toBeUndefined();
      expect(response.data?.basicLogout.success).toBe(true);
      expect(response.data?.basicLogout.data.userId).toBeDefined();
    });
  });
});
