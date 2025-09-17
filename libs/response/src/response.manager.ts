import { ApiResponse } from '@libs/response';
import { HttpStatus } from '@nestjs/common';

export class ResponseManager {
  static success<T>(
    data?: T,
    status: HttpStatus = HttpStatus.OK,
    message?: string,
  ): ApiResponse<T> {
    return {
      data: data,
      status: status,
      message: message,
      success: true,
    };
  }
}
