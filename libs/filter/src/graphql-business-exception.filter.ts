import { ArgumentsHost, Catch, Injectable } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import {
  ApplicationException,
  BaseBusinessException,
  DomainException,
  ErrorFactory,
  RequestContext,
  RequestContextExtractor,
} from '@libs/exception';
import { LoggerService } from '@libs/logger';

@Injectable()
@Catch(DomainException, ApplicationException)
export class GraphQLBusinessExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: BaseBusinessException, host: ArgumentsHost): GraphQLError {
    const context = RequestContextExtractor.fromGraphQLContext(
      host.switchToHttp().getRequest(),
    );

    /*   this.logger.error(
      `Business Error: ${exception.message}`,
      exception.stack || 'No stack',
      context,
    ) */ return this.createGraphQLError(exception, context);
  }

  private createGraphQLError(
    exception: DomainException | ApplicationException,
    requestContext: RequestContext,
  ): GraphQLError {
    if (exception instanceof DomainException) {
      return ErrorFactory.fromDomainException(exception, {
        operationName: requestContext.operationName,
        timestamp: requestContext.timestamp?.toISOString(),
      });
    }

    return ErrorFactory.fromApplicationException(exception, {
      operationName: requestContext.operationName,
      timestamp: requestContext.timestamp?.toISOString(),
    });
  }
}
