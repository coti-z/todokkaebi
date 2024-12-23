import { Injectable } from '@nestjs/common';
import { JwtTokenService } from '@libs/jwt';
import { CreateTokenParam } from '@auth/application/params/create-token.param';
import { Token } from '@auth/domain/entities/token.entity';
import { TokenRepository } from '@auth/infrastructure/persistence/token.repository';
import { ReissueTokenParam } from '@auth/application/params/update-access-token.param';
import { ApplicationException, ErrorCode, errorFactory } from '@libs/exception';
import { RevokeTokenParam } from '@auth/application/params/revoke-token.param';

/**
 * 토큰의 유효성 관련 서비스를 제공하는 클래스입니다.
 * 토큰의 생성, 업데이트, 무효화의 기능을 담당합니다.
 */
@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  /**
   * 새로운 토큰을 저장합니다.
   * @param param - 새로운 토큰을 저장할 필요한 정보를 담은 파리미터
   */
  async createToken(param: CreateTokenParam): Promise<Token> {
    // 토큰 저장
    const token = this.issueToken(param.userId);
    await this.tokenRepository.save(token);
    return token;
  }

  /**
   * 저장된 토큰의 정보를 업데이트합니다.
   * @param param - 저장된 토큰의 업데이트할 정보를 담은 파라미터
   */
  async reissueTokens(param: ReissueTokenParam): Promise<Token> {
    this.jwtTokenService.verifyRefreshToken(param.refreshToken);
    // refresh token 검증 및 블랙리스트 확인
    const token = await this.tokenRepository.findTokenByRefreshToken({
      refreshToken: param.refreshToken,
    });
    if (!token || token.isRevoked || token.isExpired()) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    // 토큰 무효화 및 DB 반영
    token.revokeToken();
    await this.tokenRepository.update(token);

    // 토큰 재발급 및 DB 반영
    const reissuedToken = this.issueToken(param.userId);
    await this.tokenRepository.save(reissuedToken);
    return reissuedToken;
  }

  /**
   * 저장된 토큰의 발급을 무효화 합니다.
   * @param param - 무효화할 토큰의 정보가 담긴 파라미터
   */
  async revokeToken(param: RevokeTokenParam): Promise<void> {
    // userId의 토큰 가져오기
    const token = await this.tokenRepository.findTokenByRefreshToken({
      refreshToken: param.refreshToken,
    });
    if (!token) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    // 토큰 무효화 및 DB 반영
    token.revokeToken();
    await this.tokenRepository.update(token);
  }

  /**
   * 유효시간이 지난 토큰을 무효화 합니다.
   */
  async deleteRevokedAllTokens(): Promise<void> {
    // 유효기간이 지난  기존 모든 토큰 을 무효화 합니다.
    await this.tokenRepository.deleteAllRevokeExpiredToken();
  }

  private issueToken(userId: string): Token {
    const tokenPair = this.jwtTokenService.generateTokenPair({
      userId: userId,
    });

    return Token.create({
      userId: userId,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      expiresAt: tokenPair.refreshTokenExpires,
    });
  }
}
