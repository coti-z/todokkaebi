import { BaseBusinessException } from './base-business.exception';
import { ErrorCode } from './error-code.enum';

export class ApplicationException extends BaseBusinessException {
  constructor(public readonly errorCode: ErrorCode) {
    super(errorCode);
    this.name = 'ApplicationException';
  }
}
