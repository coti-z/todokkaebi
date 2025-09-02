import {
  ApplicationException,
  ErrorCode,
  RequestContextExtractor,
} from '@libs/exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidateRefreshTokenQuery } from '@auth/application/port/in/query/validate-refresh-token.query';
import { JwtPayloadWithToken, JwtTokenService } from '@libs/jwt';

@Injectable()
export class JwtAuthWithRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly JwtTokenService: JwtTokenService,
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const refreshToken = this.extractRefreshTokenFromHeader(req);

    if (!refreshToken) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const query = new ValidateRefreshTokenQuery(refreshToken, requestContext);

    try {
      const payload = this.JwtTokenService.verifyRefreshToken(refreshToken);
      await this.queryBus.execute(query);

      const payloadWithToken: JwtPayloadWithToken = {
        ...payload,
        token: refreshToken,
      };
      req['user'] = payloadWithToken;
      return true;
    } catch (error) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
  }

  private extractRefreshTokenFromHeader(req: any): string | undefined {
    if (!req.headers.authorization) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }

    const [type, token] = req.headers.authorization?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
