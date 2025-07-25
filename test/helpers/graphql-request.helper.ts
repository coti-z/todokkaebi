import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    [key: string]: any;
  }>;
  path?: string[];
  extensions?: any;
}

export class GraphqlRequestHelper {
  constructor(private app: INestApplication) {}

  async query<T = any>(
    query: string,
    variables?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<GraphQLResponse<T>> {
    const response = await request(this.app.getHttpServer())
      .post('/graphql')
      .set(headers || {})
      .send({ query, variables });

    return response.body;
  }

  async mutate<T = any>(
    mutation: string,
    variables?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<GraphQLResponse<T>> {
    return this.query<T>(mutation, variables, headers);
  }
}
