import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status: HttpStatus;
  success: boolean;
  message?: string;
  data?: T;
}

export class RestApiResponse<T> {
  data: T | null;
  success?: boolean;
  message?: string;
}
