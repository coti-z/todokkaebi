import {
  ArgumentsHost,
  Catch,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ErrorCode, errorFactory } from '@libs/exception';
//import { SlackNotificationService } from '@libs/slack';
import { LoggerService } from '@libs/logger';

interface ErrorInfo {
  status?: number;
  message: string;
  code: ErrorCode | string;
}
@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(
    //private readonly slackNotificationService: SlackNotificationService,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlContext = GqlExecutionContext.create(host as ExecutionContext);
    const { req } = gqlContext.getContext();

    const errorInfo = this.getErrorInfo(exception);
    this.logError(errorInfo, exception, req);

    return new GraphQLError(errorInfo.message, {
      extensions: {
        code: errorInfo.code,
        status: errorInfo.status,
        success: false,
      },
    });
  }
  private getErrorInfo(exception: any): ErrorInfo {
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception.message,
        code: (exception as any).code,
      };
    }
    if (exception instanceof GraphQLError) {
      return {
        status: exception.extensions.status as number,
        message: exception.message,
        code:
          (exception.extensions.code as string) ||
          ErrorCode.INTERNAL_SERVER_ERROR,
      };
    }

    const unhandle = errorFactory(ErrorCode.INTERNAL_SERVER_ERROR);
    return {
      message: unhandle.message,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
    };
  }

  private async logError(errorInfo: ErrorInfo, exception: any, req: any) {
    //await this.slackNotificationService.sendErrorNotification({
    //  message: errorInfo.message,
    //  status: errorInfo.status,
    //  code: errorInfo.code,
    //  body: req.body,
    //  stack: exception.stack,
    //});

    this.logger.warn(errorInfo.message, {
      status: errorInfo.status,
      code: errorInfo.code,
      body: req.body,
      stack: exception.stack,
    });
  }
}
