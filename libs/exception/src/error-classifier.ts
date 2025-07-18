import { BaseBusinessException } from './base-business.exception';

export class ErrorClassifier {
  static isBusinessError(error: any): boolean {
    return error instanceof BaseBusinessException;
  }
}
