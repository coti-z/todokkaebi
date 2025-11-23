import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { RestApiResultTransformer } from 'libs/interceptor/src/rest-api-result-transgormer.interceptor';

/**
 * User REST API Controller (CRUD)
 *
 * @description User Management RESTful API
 */

@Controller('users')
@UseInterceptors(RestApiResultTransformer)
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * Health Check
   * @internal only use develop/test
   */

  @Get('health')
  @HttpCode(HttpStatus.OK)
  async healthCheck(): Promise<{ status: string }> {
    return { status: 'OK' };
  }
}
