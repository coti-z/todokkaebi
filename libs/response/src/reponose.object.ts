import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status: HttpStatus;
  message?: string;
  data?: T;
}
