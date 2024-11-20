import { HttpStatus } from '@nestjs/common';
import { ResponseObj } from './reponose.object';

export class ResponseManager {
  static from<T>(
    data: T,
    status = HttpStatus.OK,
    message?: string,
  ): ResponseObj<T> {
    return {
      data,
      status,
      message,
    };
  }
}
