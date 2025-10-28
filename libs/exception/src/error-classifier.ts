import { BaseBusinessException } from './base-business.exception';

export class ErrorClassifier {
  static isBusinessError(error: Error): boolean {
    return error instanceof BaseBusinessException;
  }
}
