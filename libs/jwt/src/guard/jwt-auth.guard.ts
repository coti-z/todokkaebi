import { ErrorCode } from '@libs/exception';
import { errorFactory } from '@libs/exception';
import { JwtTokenService } from '@libs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    try {
      const payload = this.jwtTokenService.verifyToken(token);
      req['user'] = payload;
      return true;
    } catch {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(req: any): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
