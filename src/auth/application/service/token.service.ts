import { CreateTokenParam } from '@auth/application/dto/params/create-token.param';
import { ReissuedAccessTokenByTokenParam } from '@auth/application/dto/params/reissue-access-token-by-token.param';
import { RevokeAccessTokenByAccessToken } from '@auth/application/dto/params/revoke-access-token-by-access-token.param';
import { RevokeTokenByTokenParam } from '@auth/application/dto/params/revoke-token-by-token.param';
import { RevokeRefreshTokenParam } from '@auth/application/dto/params/revoke-token.param';
import {
  ITokensRepository,
  TokenRepositorySymbol,
} from '@auth/application/port/out/token-repository.port';
import { Token } from '@auth/domain/entity/token.entity';
import { ApplicationException, ErrorCode } from '@libs/exception';
import { Inject, Injectable } from '@nestjs/common';
import { TokenValidationInboundPort } from 'libs/jwt/src/port/token-validation.port';

/**
 * 토큰의 유효성 관련 서비스를 제공하는 클래스입니다.
 * 토큰의 생성, 업데이트, 무효화의 기능을 담당합니다.
 */
@Injectable()
export class TokenService implements TokenValidationInboundPort {
  constructor(
    @Inject(TokenRepositorySymbol)
    private readonly tokenRepository: ITokensRepository,
  ) {}
  /**
   * 새로운 jwt을 유효성 관리를 위해서 데이터베이스에 저장합니다.
   * @param param - 새로운 토큰을 저장할 필요한 정보를 담은 파리미터
   */
  async storeToken(param: CreateTokenParam): Promise<Token> {
    // 토큰 저장
    const token = Token.create({
      accessToken: param.accessToken,
      refreshToken: param.refreshToken,
      refreshTokenExpiresAt: param.refreshTokenExpiresAt,
      userId: param.userId,
    });
    await this.tokenRepository.save(token);
    return token;
  }
  /**
   * 

   * 재발급된 AccessToken을 저장합니다.
   * @param param - 저장된 토큰의 업데이트할 정보를 담은 파라미터
   */
  async storeReissuedAccessToken(
    param: ReissuedAccessTokenByTokenParam,
  ): Promise<Token> {
    if (!param) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }
    // 토큰 재발급 및 DB 반영
    const reissuedToken = Token.create({
      userId: param.userId,
      accessToken: param.accessToken,
      refreshToken: param.refreshToken,
      refreshTokenExpiresAt: param.refreshTokenExpiresAt,
    });

    await this.tokenRepository.save(reissuedToken);
    return reissuedToken;
  }

  /**
   * 저장된 리프레시 토큰의 발급을 무효화 합니다.
   * @param param - 무효화할 토큰의 정보가 담긴 파라미터
   */
  async revokeTokenByRefreshToken(
    param: RevokeRefreshTokenParam,
  ): Promise<Token> {
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

  async revokeTokenByAccessToken(
    param: RevokeAccessTokenByAccessToken,
  ): Promise<Token> {
    const token = await this.tokenRepository.findTokenByAccessToken({
      accessToken: param.accessToken,
    });

    if (!token) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }

    token.revokeToken();
    await this.tokenRepository.update(token);

    return token;
  }

  /**
   * 저장된 토큰을 무효화 합니다.
   *
   * @param {RevokeTokenByTokenParam} param
   * @return {*}
   * @memberof TokenService
   */
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

  async validateAccessTokenNotRevoke(accessToken: string): Promise<void> {
    const token = await this.tokenRepository.findTokenByAccessToken({
      accessToken,
    });

    if (!token) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }

    if (token.isRevoked) {
      throw new ApplicationException(ErrorCode.TOKEN_EXPIRED);
    }

    if (token.isExpired()) {
      throw new ApplicationException(ErrorCode.TOKEN_EXPIRED);
    }
  }

  async validateRefreshTokenNotRevoke(refreshToken: string) {
    const token = await this.tokenRepository.findTokenByRefreshToken({
      refreshToken,
    });

    if (!token) {
      throw new ApplicationException(ErrorCode.INVALID_TOKEN);
    }

    if (token.isRevoked) {
      throw new ApplicationException(ErrorCode.TOKEN_EXPIRED);
    }

    if (token.isExpired()) {
      throw new ApplicationException(ErrorCode.TOKEN_EXPIRED);
    }
  }
}
