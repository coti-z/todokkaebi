import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { CreateUserResponse } from '@user/presentation/dto/controller/c-user.response';

export const HealthCheckSwagger = applyDecorators(
  ApiOperation({
    summary: 'Health Check',
    description: 'server status checker',
  }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'success response',
    schema: {
      example: {
        success: true,
        data: { status: 'OK' },
      },
    },
  }),
);

export const CreateUserSwagger = applyDecorators(
  ApiOperation({
    summary: 'user created',
    description: 'create new user.',
  }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: CreateUserResponse,
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(CreateUserResponse) },
      },
    },
  }),
);
