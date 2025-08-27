import { ValidateAccessTokenQuery } from '@auth/application/port/in/query/validate-access-token.query';
import { ApplicationException, ErrorCode } from '@libs/exception';
import { JwtPayloadWithToken, JwtTokenService } from '@libs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthWithAccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const accessToken = this.extractAccessTokenFromHeader(req);

    if (!accessToken) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }

    const query = new ValidateAccessTokenQuery(accessToken);
    try {
      const payload = this.jwtTokenService.verifyAccessToken(accessToken);
      await this.queryBus.execute(query);

      const payloadWithToken: JwtPayloadWithToken = {
        ...payload,
        token: accessToken,
      };
      req['user'] = payloadWithToken;
      return true;
    } catch {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
  }

  private extractAccessTokenFromHeader(req: any): string | undefined {
    if (!req.headers.authorization) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    const [type, token] = req.headers.authorization?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
