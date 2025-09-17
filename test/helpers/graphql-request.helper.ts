import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as http from 'http';

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
  private baseURL: string;
  private http: http.Agent;

  constructor(private app: INestApplication) {
    // Node.js 20의 keepAlive 문제 해결을 위한 최적화
    this.http = new http.Agent({
      keepAlive: false, // Node.js 18 방식으로 설정
      maxSockets: Infinity, // 무제한 동시 소켓
      timeout: 30000, // 타임아웃 증가
      maxFreeSockets: 0, // keepAlive false이므로 불필요
    });
  }

  async query<T = any>(
    query: string,
    variables?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<GraphQLResponse<T>> {
    const response = await request(this.app.getHttpServer())
      .post('/graphql')
      .agent(this.http)
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
