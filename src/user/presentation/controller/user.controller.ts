import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { RequestContextExtractor } from '@libs/exception';

import { RestApiResultTransformer } from 'libs/interceptor/src/rest-api-result-transgormer.interceptor';

import { CreateUserResponse } from '@user/presentation/dto/controller/c-user.response';
import { CreateUserInput } from '@user/presentation/dto/graphql/inputs/graphql/create-user.input';
import { UserPresentationMapper } from '@user/presentation/mapper/user-presentation.mapper';
import { CreateUserSwagger } from '@user/presentation/swagger/user.swagger';

/**
 * User REST API Controller (CRUD)
 *
 * @description
 * Provides user Management RESTful API endpoints for user management operations
 *
 * @architecture
 * - Presentation Layer entry point for REST API
 */

@ApiTags('users')
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

  /**
   * Create User (User Registration)
   * @param {CreateUserInput} input - User Creation Request data
   * @param {Request} request - CreateUserCommand (Presentation Mapper)
   * @returns {CreateUserResponse} - Create User Response
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateUserSwagger
  async createUser(
    @Body() input: CreateUserInput,
    @Req() request: Request,
  ): Promise<CreateUserResponse> {
    const requestContext = RequestContextExtractor.fromHttpRequest(request);
    const command = UserPresentationMapper.toCreateUserCommand(
      input,
      requestContext,
    );
    const result = await this.commandBus.execute(command);
    return UserPresentationMapper.resultToRestApiUserResponse(result);
  }
}
