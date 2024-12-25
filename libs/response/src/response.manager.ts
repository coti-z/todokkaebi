import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@libs/response/reponose.object';

export class ResponseManager {
  static success<T>(
    data?: T,
    status: HttpStatus = HttpStatus.OK,
    message?: string,
  ): ApiResponse<T> {
    return {
      data,
      status,
      message,
    };
  }
}
