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
import { ApplicationException } from '../../exception/src/application.exception';
import { DomainException } from '../../exception/src/domain.exception';

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
    // 1) 도메인 예외
    if (exception instanceof DomainException) {
      const baseError = errorFactory(exception.errorCode);
      return {
        status: (baseError.extensions?.status as number) || 400, // 혹은 baseError.extensions.status
        message: exception.message || baseError.message,
        code: exception.errorCode,
      };
    }

    // 2) 애플리케이션 예외
    if (exception instanceof ApplicationException) {
      const baseError = errorFactory(exception.errorCode);
      return {
        status: (baseError.extensions?.status as number) || 409,
        message: exception.message || baseError.message,
        code: exception.errorCode,
      };
    }

    // 3) HttpException
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception.message,
        code: (exception as any).code || ErrorCode.INTERNAL_SERVER_ERROR,
      };
    }

    // 4) GraphQLError (이미 변환된 케이스)
    if (exception instanceof GraphQLError) {
      return {
        status: (exception.extensions?.status as number) || 500,
        message: exception.message,
        code:
          (exception.extensions?.code as string) ||
          ErrorCode.INTERNAL_SERVER_ERROR,
      };
    }

    // 5) 나머지(미처리 예외)
    const unhandled = errorFactory(ErrorCode.INTERNAL_SERVER_ERROR);
    return {
      status: (unhandled.extensions?.status as number) || 500,
      message: unhandled.message,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
    };
  }

  private async logError(errorInfo: ErrorInfo, exception: any, req: any) {
    // 슬랙 알림 + 로깅
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
