import { HttpStatusCode } from 'axios';
import { GraphQLError } from 'graphql';

import { ApplicationException } from 'libs/exception/src/application.exception';
import { BaseBusinessException } from 'libs/exception/src/base-business.exception';
import { DomainException } from 'libs/exception/src/domain.exception';

import { ErrorCode } from './error-code.enum';
import { ERROR_MAP, ErrorResponse } from './error-map.interface';

interface ErrorContext {
  path?: string;
  timestamp?: string;
  operationName?: string;
  userId?: string;
}

export class ErrorFactory {
  static fromBusinessException(
    exception: DomainException | ApplicationException,
    context?: ErrorContext,
  ) {
    const errorMapping = ERROR_MAP[exception.errorCode];
    const timestamp = context?.timestamp || new Date().toISOString();

    return new GraphQLError(
      ErrorFactory.getErrorMessage(exception, errorMapping),
      {
        extensions: {
          code: exception.errorCode,
          statusCode: errorMapping.statusCode || HttpStatusCode.BadRequest,
          timestamp,
          path: context?.path,
          operationName: context?.operationName,
        },
      },
    );
  }

  static fromErrorCode(
    errorCode: ErrorCode,
    customMessage?: string,
  ): GraphQLError {
    const errorMapping =
      ERROR_MAP[errorCode] || ERROR_MAP[ErrorCode.INTERNAL_SERVER_ERROR];

    return new GraphQLError(customMessage || errorMapping.message, {
      extensions: {
        code: errorCode,
        statusCode: errorMapping.statusCode,
      },
    });
  }

  static fromUnknownException(exception: any): GraphQLError {
    const errorMapping = ERROR_MAP[ErrorCode.INTERNAL_SERVER_ERROR];
    const message =
      process.env.NODE_ENV === 'production'
        ? errorMapping.message
        : exception.message;

    return new GraphQLError(message, {
      extensions: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: errorMapping.statusCode,
      },
    });
  }

  private static getErrorMessage(
    exception: BaseBusinessException,
    errorMapping?: any,
  ) {
    if (exception.message && exception.message !== exception.errorCode) {
      return exception.message;
    }

    return errorMapping?.message;
  }
}
