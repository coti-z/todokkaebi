import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { RestApiResponse } from '@libs/response';

/**
 * REST API 응답 자동 변환 Interceptor
 *
 * @description
 * Controller에서 반환한 데이터를 RestApiResponse 포멧으로 자동 반환합니다.
 *
 * @remarks
 * - GraphQL 요청에는 적용되지 않음 (HTTP 요청만 처리)
 * - 성공 응답만 처리 (에러는 ExceptionFilter에서 처리)
 */

@Injectable()
export class RestApiResultTransformer<T>
  implements NestInterceptor<T, RestApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<RestApiResponse<T>> {
    return next.handle().pipe(map(data => this.transform(data)));
  }

  private transform(data: T): RestApiResponse<T> {
    return {
      success: true,
      data: data ?? null,
    };
  }
}
