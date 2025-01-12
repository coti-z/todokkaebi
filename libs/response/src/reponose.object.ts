import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status: HttpStatus;
  success: boolean;
  message?: string;
  data?: T;
}
