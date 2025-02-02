import { INestApplication } from '@nestjs/common';
import { DocumentNode, print } from 'graphql';
import * as request from 'supertest';

// 기본 응답 타입을 제네릭으로 정의
export interface BaseResponse<T> {
  status: string;
  success: boolean;
  message: string;
  data: T;
}

// GraphQL 응답 타입 정의
interface GraphQLResponse<T> {
  data: {
    [key: string]: BaseResponse<T>;
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export class GraphQLTestHelper {
  constructor(private readonly app: INestApplication) {}

  /**
   * GraphQL 쿼리/뮤테이션을 실행하고 결과를 반환합니다.
   * @param document - GraphQL 문서 (쿼리/뮤테이션)
   * @param variables - 쿼리 변수 (선택사항)
   * @returns Promise<BaseResponse<T>> - 실행 결과
   * @throws Error - GraphQL 에러 발생 시
   */
  async execute<TData = any, TVariables = Record<string, any>>(
    document: DocumentNode,
    variables?: TVariables,
  ): Promise<BaseResponse<TData>> {
    try {
      const response = await request(this.app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(document),
          variables,
        });

      const body = response.body as GraphQLResponse<TData>;

      if (body.errors?.length) {
        throw new Error(this.formatGraphQLErrors(body.errors));
      }

      // data 객체의 첫 번째 키에 해당하는 값을 반환
      const operationKey = Object.keys(body.data)[0];
      return body.data[operationKey];
    } catch (error) {
      throw new Error(`GraphQL 실행 오류: ${error.message}`);
    }
  }

  /**
   * GraphQL 에러 메시지를 포맷팅합니다.
   */
  private formatGraphQLErrors(
    errors: GraphQLResponse<unknown>['errors'],
  ): string {
    return (
      errors
        ?.map(error => {
          const location = error.locations?.[0]
            ? ` (line: ${error.locations[0].line}, column: ${error.locations[0].column})`
            : '';
          const path = error.path ? ` at path: ${error.path.join('.')}` : '';
          return `${error.message}${location}${path}`;
        })
        .join('\n') || 'Unknown GraphQL error'
    );
  }
}
