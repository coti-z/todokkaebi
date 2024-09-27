import { ErrorCode } from '@/utils/exception/error-code.enum';
import {
  ERROR_MAP,
  ErrorResponse,
} from '@/utils/exception/error-map.interface';
import { GraphQLError } from 'graphql';

export function errorFactory(errorCode: ErrorCode): GraphQLError {
  const errorInfo: ErrorResponse = ERROR_MAP[errorCode];
  if (!errorInfo) {
    const internalError = ERROR_MAP[ErrorCode.INTERNAL_SERVER_ERROR];
    return new GraphQLError(internalError.message, {
      extensions: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: internalError.statusCode,
      },
    });
  }
  return new GraphQLError(errorInfo.message, {
    extensions: {
      code: errorCode,
      statusCode: errorInfo.statusCode,
    },
  });
}
