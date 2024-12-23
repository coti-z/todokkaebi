import { ErrorCode } from './error-code.enum';
import { ERROR_MAP } from './error-map.interface';

export abstract class BaseBusinessException extends Error {
  constructor(public readonly errorCode: ErrorCode) {
    super(ERROR_MAP[errorCode].message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
