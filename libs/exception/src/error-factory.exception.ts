import { GraphQLError } from 'graphql';
import { ERROR_MAP, ErrorResponse } from './error-map.interface';
import { ErrorCode } from './error-code.enum';

export function errorFactory(
  errorCode: ErrorCode,
  overrideMessage?: string,
): GraphQLError {
  const errorInfo: ErrorResponse =
    ERROR_MAP[errorCode] ?? ERROR_MAP[ErrorCode.INTERNAL_SERVER_ERROR];
  const message = overrideMessage ?? errorInfo.message;
  return new GraphQLError(message, {
    extensions: {
      code: errorCode,
      statusCode: errorInfo.statusCode,
    },
  });
}
