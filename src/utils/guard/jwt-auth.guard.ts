import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { JwtTokenService } from '@/utils/jwt/jwt.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    try {
      const payload = this.jwtService.verifyToken(token);
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
