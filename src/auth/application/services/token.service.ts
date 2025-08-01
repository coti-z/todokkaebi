import { Inject, Injectable } from '@nestjs/common';
import { CreateTokenParam } from '@auth/application/dto/params/create-token.param';
import { Token } from '@auth/domain/entity/token.entity';
import { ReissueTokenParam } from '@auth/application/dto/params/update-access-token.param';
import { RevokeTokenParam } from '@auth/application/dto/params/revoke-token.param';
import {
  ITokensRepository,
  TokenRepositorySymbol,
} from '@auth/application/port/out/token-repository.port';
import { JwtTokenService, TokenEnum } from '@libs/jwt';
import { ApplicationException, ErrorCode } from '@libs/exception';
import { access } from 'fs';
import { RevokeTokenByTokenParam } from '@auth/application/dto/params/revoke-token-by-token.param';
import { reissueAccessTokenByTokenParam } from '@auth/application/dto/params/reissue-access-token-by-token.param';

/**
 * 토큰의 유효성 관련 서비스를 제공하는 클래스입니다.
 * 토큰의 생성, 업데이트, 무효화의 기능을 담당합니다.
 */
@Injectable()
export class TokenService {
  constructor(
    @Inject(TokenRepositorySymbol)
    private readonly tokenRepository: ITokensRepository,
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
   * AccessToken을 재발급 합니다.
   * @param param - 저장된 토큰의 업데이트할 정보를 담은 파라미터
   */
  async reissueAccessTokensByToken(
    param: reissueAccessTokenByTokenParam,
  ): Promise<Token> {
    const token = param.token;
    if (!token) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    const reissuedAccessToken = this.reissueAccessToken(token.userId);

    // 토큰 재발급 및 DB 반영
    const reissuedToken = Token.create({
      userId: token.userId,
      accessToken: reissuedAccessToken.token,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    });

    await this.tokenRepository.save(reissuedToken);
    return reissuedToken;
  }

  /**
   * 저장된 토큰의 발급을 무효화 합니다.
   * @param param - 무효화할 토큰의 정보가 담긴 파라미터
   */
  async revokeTokenByRefreshToken(param: RevokeTokenParam): Promise<Token> {
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
    return token;
  }

  async revokeTokenByToken(param: RevokeTokenByTokenParam) {
    const token = param.token;
    if (!token) {
      throw new ApplicationException(ErrorCode.UNAUTHORIZED);
    }
    token.revokeToken();

    await this.tokenRepository.update(token);
    return token;
  }

  /**
   * 유효시간이 지난 토큰을 무효화 합니다.
   */
  async deleteRevokedAllTokens(): Promise<void> {
    // 유효기간이 지난  기존 모든 토큰 을 무효화 합니다.
    await this.tokenRepository.deleteAllRevokeExpiredToken();
  }

  /**
   * 토큰을 검증합니다.
   * @param
   * @returns Token
   */
  async verifyToken(token: string) {
    await this.jwtTokenService.verifyToken(token);
  }

  private issueToken(userId: string): Token {
    const tokenPair = this.jwtTokenService.generateTokenPair({
      userId: userId,
    });

    return Token.create({
      userId: userId,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      refreshTokenExpiresAt: tokenPair.refreshTokenExpires,
    });
  }

  private reissueAccessToken(userId: string) {
    const accessToken = this.jwtTokenService.generateToken({
      type: TokenEnum.ACCESS,
      userId: userId,
    });

    return accessToken;
  }
}
