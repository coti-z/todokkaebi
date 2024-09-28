import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { LoggerService } from '@/utils/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { error } from 'winston';
interface ErrorInfo {
  status?: number;
  message: string;
  code: ErrorCode | string;
}
@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlContext = GqlExecutionContext.create(host as ExecutionContext);
    const { req } = gqlContext.getContext();

    const errorInfo = this.getErrorInfo(req);
    this.logError(errorInfo, exception, req);

    return new GraphQLError(errorInfo.message, {
      extensions: {
        code: errorInfo.code,
        status: errorInfo.status,
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

  private logError(errorInfo: ErrorInfo, exception: any, req: any) {
    this.logger.warn(errorInfo.message, {
      status: errorInfo.status,
      code: errorInfo.code,
      body: req.body,
      stack: exception.stack,
    });
  }
}
