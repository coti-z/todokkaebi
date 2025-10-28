import { ErrorCode } from './error-code.enum';

export abstract class BaseBusinessException extends Error {
  constructor(
    public readonly errorCode: ErrorCode,
    public readonly isPublic: boolean = true,
  ) {
    super(errorCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
