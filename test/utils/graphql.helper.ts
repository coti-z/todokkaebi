import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export enum GraphQLResolverEnum {
  CREATE_USER = 'CREATE_USER',
  GET_USER = 'GET_USER',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_USER = 'UPDATE_USER',
}

export type CreateUserInput = {
  email: string;
  password: string;
  nickname: string;
};

export type UpdateUserInfoInput = {
  nickname: string;
  birthday: Date;
  email: string;
};

export const GraphQLAPI = {
  [GraphQLResolverEnum.CREATE_USER]: `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        accessToken
        refreshToken
      }
    }
  `,
  [GraphQLResolverEnum.UPDATE_USER]: `
    mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
      updateUserInfo(input: $input) {
        id
        email
        nickname
        birthday
      }
    } 
  `,
  [GraphQLResolverEnum.DELETE_ACCOUNT]: `
    mutation DeleteUser {
      deleteUser
    }
  `,
  [GraphQLResolverEnum.GET_USER]: `
    query GetUserInfo {
      getUserInfo {
        id
        email
        nickname
        birthday
      }
    }
  `,
} as const;

export async function executeGraphql(
  app: INestApplication,
  queryName: GraphQLResolverEnum,
  variables?: any,
  token?: string,
) {
  const query = GraphQLAPI[queryName];
  const req = request(app.getHttpServer())
    .post('/graphql')
    .send({ query, variables });

  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
  return await req;
}
