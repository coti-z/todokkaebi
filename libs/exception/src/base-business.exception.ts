import { ErrorCode } from './error-code.enum';

export abstract class BaseBusinessException extends Error {
  constructor(public readonly errorCode: ErrorCode) {
    super(errorCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
