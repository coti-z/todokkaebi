import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '@libs/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const resolverName = ctx.getInfo().fieldName;

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        this.logger.info(`Success ${resolverName}`, { date: now });

        return data;
      }),
    );
  }
}
