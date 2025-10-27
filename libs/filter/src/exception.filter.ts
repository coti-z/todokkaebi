import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import {
  ApplicationException,
  DomainException,
  ErrorFactory,
} from '@libs/exception';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error, _host: ArgumentsHost): GraphQLError {
    //const gqlContext = GqlExecutionContext.create(host as ExecutionContext);
    //this.logError(exception);
    console.log(exception);
    return this.createGraphQLError(exception);
  }

  private createGraphQLError(exception: Error): GraphQLError {
    if (
      exception instanceof DomainException ||
      exception instanceof ApplicationException
    ) {
      return ErrorFactory.fromBusinessException(exception);
    }
    return ErrorFactory.fromUnknownException(exception);
  }

  /*   private async logError(exception: Error, req?: Request) {
    // 슬랙 알림 + 로깅
    //await this.slackNotificationService.sendErrorNotification({
    //  message: errorInfo.message,
    //  status: errorInfo.status,
    //  code: errorInfo.code,
    //  body: req.body,
    //  stack: exception.stack,
    //});

    const logContext = {
      exceptionType: exception.constructor.name,
      message: exception.message,
      userAgent: req?.headers?.get('user-agent'),
      variables: req?.body?.getReader(),
    };

    this.logger.error(
      `Unhandled Exception: ${exception.message}`,
      exception.stack || 'Node Stack trace available',
      logContext,
    );
  } */
}
