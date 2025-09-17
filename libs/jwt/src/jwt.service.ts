import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenEnum } from '@libs/jwt';
import { ApplicationException, ErrorCode } from '@libs/exception';
@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  verifyAccessToken(token: string): JwtPayload {
    const payload: JwtPayload = this.jwtService.verify(token);
    if (payload.type !== TokenEnum.ACCESS) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }
    return payload;
  }
  verifyRefreshToken(token: string): JwtPayload {
    const payload: JwtPayload = this.jwtService.verify(token);
    if (payload.type !== TokenEnum.REFRESH) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }
    return payload;
  }
}
