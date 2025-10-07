import { SetMetadata, UseGuards } from '@nestjs/common';

import {
  RATE_LIMIT_METADATA_KEY,
  RateLimitOptions,
} from '@libs/decorators/rate-limit/rate-limit.options';

import { RateLimitGuard } from './rate-limit.guard';

export function RateLimit(options: RateLimitOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata(RATE_LIMIT_METADATA_KEY, options)(
      target,
      propertyKey,
      descriptor,
    );
    UseGuards(RateLimitGuard)(target, propertyKey, descriptor);
    return descriptor;
  };
}
