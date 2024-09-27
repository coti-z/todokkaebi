import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { Catch, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly configService: ConfigService) {}
  catch(exception: any) {
    let status: any;
    let message: string;
    let code: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = (exception as any).code || ErrorCode.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof GraphQLError) {
      status = exception.extensions?.status;
      message = exception.message;
      code = exception.extensions?.code || ErrorCode.INTERNAL_SERVER_ERROR;
    } else {
      const unhandled = errorFactory(ErrorCode.INTERNAL_SERVER_ERROR);
      message = unhandled.message;
      code = ErrorCode.INTERNAL_SERVER_ERROR;
    }
    return new GraphQLError(message, {
      extensions: {
        code,
        status,
      },
    });
  }
}
