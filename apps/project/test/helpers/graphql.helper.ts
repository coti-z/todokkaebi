import { INestApplication } from '@nestjs/common';
import {
  GraphQLOperations,
  ProjectMutations,
  ProjectQueries,
  CategoryMutations,
  CategoryQueries,
} from './graphql-resolver.enum';
import * as request from 'supertest';

export class GraphQLTestHelper {
  constructor(private readonly app: INestApplication) {}

  async query<TResult = any, TInput = Record<string, any>>(
    operation: ProjectQueries | CategoryQueries,
    variables?: TInput,
  ): Promise<TResult> {
    const response = await request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: GraphQLOperations[operation],
        variables,
      });
    if (response.body.errors) {
      throw new Error(response.body.errors[0].message);
    }
    return response.body.data;
  }

  async mutation<T = any, V = Record<string, any>>(
    mutation: ProjectMutations | CategoryMutations,
    variables?: V,
  ): Promise<T> {
    const response = await request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: GraphQLOperations[mutation],
        variables,
      });
    if (response.body.errors) {
      throw Error(JSON.stringify(response.body.errors, null, 2));
    }

    return response.body.data;
  }
}
