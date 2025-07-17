import {
  ApplicationException,
  DomainException,
  ErrorFactory,
} from '@libs/exception';
import { LoggerService } from '@libs/logger';

import {
  ArgumentsHost,
  Catch,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(
    //private readonly slackNotificationService: SlackNotificationService,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlContext = GqlExecutionContext.create(host as ExecutionContext);
    const { req } = gqlContext.getContext();
    // 로깅
    this.logError(exception, req);

    // GraphQLError 생성
    return this.createGraphQLError(exception);
  }

  private createGraphQLError(exception: any): GraphQLError {
    if (
      exception instanceof DomainException ||
      exception instanceof ApplicationException
    ) {
      return ErrorFactory.fromBusinessException(exception);
    }
    return ErrorFactory.fromUnknownException(exception);
  }

  private async logError(exception: any, req: any) {
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
      userAgent: req?.headers?.['user-agent'],
      variables: req?.body?.variables,
    };

    if (
      exception instanceof DomainException ||
      exception instanceof ApplicationException
    ) {
      this.logger.warn(`Business Exception: ${exception.message}`, logContext);
    } else {
      this.logger.error(
        `Unhandled Exception: ${exception.message}`,
        exception.stack,
        logContext,
      );
    }
  }
}
