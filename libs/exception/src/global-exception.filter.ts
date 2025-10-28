import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { LoggerService } from '@libs/logger';

import { ErrorCode } from 'libs/exception/src/error-code.enum';
import { RequestContextExtractor } from 'libs/exception/src/request-context.extractor';

@Catch() // 모든 예외
export class GlobalExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost): GraphQLError {
    const gqlHost = GqlArgumentsHost.create(host);
    const requestContext = RequestContextExtractor.fromGraphQLContext(
      gqlHost.getContext(),
    );

    this.logger.error(
      `Unexpected System Error: ${exception.message}`,
      exception.stack || 'No stack trace',
      requestContext,
    );

    return new GraphQLError('서버 내부 오류가 발생했습니다.', {
      extensions: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        timestamp: new Date().toISOString(),
        operationName: requestContext.operationName,
      },
    });
  }
}
