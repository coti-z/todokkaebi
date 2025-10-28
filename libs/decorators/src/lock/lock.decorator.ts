import { SetMetadata, UseInterceptors } from '@nestjs/common';

import { LockInterceptor } from '@libs/decorators/lock/lock.interceptor';
import {
  LOCK_METADATA_KEY,
  LockOptions,
} from '@libs/decorators/lock/lock.interface';

export function Lock(options: LockOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata(LOCK_METADATA_KEY, options)(target, propertyKey, descriptor);
    UseInterceptors(LockInterceptor)(target, propertyKey, descriptor);
    return descriptor;
  };
}
