import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { LoggerService } from '@/utils/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let status: any;
    let message: string;
    let code: any;
    const req = ctx.getRequest();

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = (exception as any).code || ErrorCode.INTERNAL_SERVER_ERROR;
      this.logger.warn(`HttpException: ${exception.message}`, {
        statusCode: exception.getStatus(),
        path: req.url,
        method: req.method,
      });
    } else if (exception instanceof GraphQLError) {
      console.log(exception, req.url);
      this.logger.warn('test', { test: 'test' });
      status = exception.extensions?.status;
      message = exception.message;
      code = exception.extensions?.code || ErrorCode.INTERNAL_SERVER_ERROR;
      this.logger.warn(`HttpException: ${exception.message}`, {
        statusCode:
          exception.extensions?.code || ErrorCode.INTERNAL_SERVER_ERROR,
        path: req.url,
        method: req.method,
      });
    } else {
      const unhandled = errorFactory(ErrorCode.INTERNAL_SERVER_ERROR);
      message = unhandled.message;
      code = ErrorCode.INTERNAL_SERVER_ERROR;

      this.logger.error(
        `UnhandledException: ${unhandled.message}`,
        exception instanceof Error
          ? exception.stack
          : 'No stack trace available',
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          path: req.url,
          method: req.method,
        },
      );
    }

    return new GraphQLError(message, {
      extensions: {
        code,
        status,
      },
    });
  }
}
