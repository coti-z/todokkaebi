import { ApplicationException } from './application.exception';
import { ErrorClassifier } from './error-classifier';
import { ErrorCode } from './error-code.enum';

export class ErrorHandlingStrategy {
  static handleError(error: any): never {
    if (ErrorClassifier.isBusinessError(error)) {
      throw error;
    }

    throw new ApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
