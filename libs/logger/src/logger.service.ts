import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  info(message: string, context?: Record<string, any>) {
    this.logger.info(message);
  }

  warn(message: string, context?: Record<string, any>) {
    this.logger.warn(message);
  }

  error(message: string, trace: string, context?: Record<string, any>) {
    this.logger.error(message, { trace, ...context });
  }
}
