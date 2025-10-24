import { Injectable } from '@nestjs/common';

import { LoggerService } from '@libs/logger';

import { ApplicationException } from './application.exception';
import { ErrorClassifier } from './error-classifier';
import { ErrorCode } from './error-code.enum';
import { RequestContext } from './request-context.interface';

@Injectable()
export class ErrorHandlingStrategy {
  constructor(private readonly logger: LoggerService) {}

  handleError(error: Error, context: RequestContext): never {
    if (ErrorClassifier.isBusinessError(error)) {
      // 비즈니스 에러는 warn 레벨로 로깅
      this.logger.warn(
        `Business Error in ${error.name}: ${error.message}`,
        context,
      );
      throw error;
    }

    // 시스템 에러는 error 레벨로 로깅 (스택 트레이스 포함)
    this.logger.error(
      `System Error in ${error.name}: ${error.message}`,
      error.stack || 'No stack trace available',
      context,
    );

    throw new ApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
