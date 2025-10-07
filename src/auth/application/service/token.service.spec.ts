import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationException, ErrorCode } from '@libs/exception';

import { CreateTokenParam } from '@auth/application/dto/params/create-token.param';
import { ReissuedAccessTokenByTokenParam } from '@auth/application/dto/params/reissue-access-token-by-token.param';
import { RevokeAccessTokenByAccessToken } from '@auth/application/dto/params/revoke-access-token-by-access-token.param';
import { RevokeTokenByTokenParam } from '@auth/application/dto/params/revoke-token-by-token.param';
import { RevokeRefreshTokenParam } from '@auth/application/dto/params/revoke-token.param';
import {
  ITokensRepository,
  TokenRepositorySymbol,
} from '@auth/application/port/out/token-repository.port';
import { TokenService } from '@auth/application/service/token.service';
import { Token } from '@auth/domain/entity/token.entity';

describe('TokenByJWTService', () => {
  let service: TokenService;
  let tokenRepository: jest.Mocked<ITokensRepository>;

  beforeEach(async () => {
    const mockTokenRepository: jest.Mocked<ITokensRepository> = {
      update: jest.fn(),
      deleteAllRevokeExpiredToken: jest.fn(),
      findTokenByAccessToken: jest.fn(),
      findTokenByRefreshToken: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: TokenRepositorySymbol,
          useValue: mockTokenRepository,
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    tokenRepository = module.get(TokenRepositorySymbol);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('storeToken', () => {
    it('should create ans store a new token', async () => {
      // Arrange
      const params: CreateTokenParam = {
        userId: 'user-123',
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2025-12-31'),
      };
      tokenRepository.save.mockResolvedValue(undefined);

      // Act
      const result = await service.storeToken(params);

      // Assert
      expect(result).toBeInstanceOf(Token);
      expect(result.userId).toBe(params.userId);
      expect(result.accessToken).toBe(params.accessToken);
      expect(result.refreshToken).toBe(params.refreshToken);
    });
  });

  describe('storeReissuedAccessToken', () => {
    it('should create and store reissued access token', async () => {
      // Arrange
      const params: ReissuedAccessTokenByTokenParam = {
        userId: 'user-456',
        accessToken: 'new-access-token',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2025-12-31'),
      };
      tokenRepository.save.mockResolvedValue(undefined);

      // Act
      const result = await service.storeReissuedAccessToken(params);

      // Assert
      expect(result).toBeInstanceOf(Token);
      expect(result.userId).toBe(params.userId);
      expect(result.accessToken).toBe(params.accessToken);
    });

    it('should throw NOT_FOUND exception when params is null', async () => {
      // Arrange
      const params = null as any;

      // Act & Assert
      try {
        await service.storeReissuedAccessToken(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('revokeTokenByRefreshToken', () => {
    it('should revoke token by refresh token successfully', async () => {
      // Arrange
      const token = Token.create({
        userId: 'user-123',
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2025-12-31'),
      });

      const params: RevokeRefreshTokenParam = {
        refreshToken: 'refresh-token-xyz',
      };

      tokenRepository.findTokenByRefreshToken.mockResolvedValue(token);
      tokenRepository.update.mockResolvedValue(undefined);

      // Act
      const result = await service.revokeTokenByRefreshToken(params);

      // Assert
      expect(result.isExpired()).toBe(true);
    });

    it('should throw UNAUTHORIZED exception when token not found', async () => {
      // Arrange
      const params: RevokeRefreshTokenParam = {
        refreshToken: 'non-existent-token',
      };

      tokenRepository.findTokenByRefreshToken.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.revokeTokenByRefreshToken(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.UNAUTHORIZED);
      }
    });
  });

  describe('revokeTokenByAccessToken', () => {
    it('should revoke token by access token successfully', async () => {
      // Arrange
      const token = Token.create({
        userId: 'user-123',
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2025-12-31'),
      });

      const revokeTokenSpy = jest.spyOn(token, 'revokeToken');
      const params: RevokeAccessTokenByAccessToken = {
        accessToken: 'access-token-abc',
      };

      tokenRepository.findTokenByAccessToken.mockResolvedValue(token);
      tokenRepository.update.mockResolvedValue(undefined);

      // Act
      const result = await service.revokeTokenByAccessToken(params);

      // Assert
      expect(result).toBe(token);
    });

    it('should throw INVALID_TOKEN exception when token not found', async () => {
      // Arrange
      const params: RevokeAccessTokenByAccessToken = {
        accessToken: 'non-existent-token',
      };
      tokenRepository.findTokenByAccessToken.mockResolvedValue(null);

      // Act & Assert

      try {
        await service.revokeTokenByAccessToken(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.INVALID_TOKEN);
      }
    });
  });

  describe('revokeTokenByToken', () => {
    it('should revoke token successfully', async () => {
      // Arrange
      const token = Token.create({
        userId: 'user-123',
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2025-12-31'),
      });

      const params: RevokeTokenByTokenParam = {
        token,
      };

      // Act
      const result = await service.revokeTokenByToken(params);

      // Assert
      expect(result.isRevoked).toBe(true);
    });

    it('should throw UNAUTHORIZED exception when token is null', async () => {
      // Arrange
      const params: RevokeTokenByTokenParam = {
        token: null as any,
      };

      // Act & Assert
      try {
        await service.revokeTokenByToken(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.UNAUTHORIZED);
      }
    });
  });
  describe('deleteRevokedAllTokens', () => {
    it('should delete all revoked expired tokens', async () => {
      // Arrange
      tokenRepository.deleteAllRevokeExpiredToken.mockResolvedValue(undefined);

      // Act
      await service.deleteRevokedAllTokens();

      // Assert
      expect(tokenRepository.deleteAllRevokeExpiredToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateAccessTokenNotRevoke', () => {
    it('should validate successfully when token is valid', async () => {
      // Arrange
      const token = Token.create({
        accessToken: 'valid-access-token',
        userId: 'user-123',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2099-12-31'),
      });

      const accessToken = 'valid-access-token';
      tokenRepository.findTokenByAccessToken.mockResolvedValue(token);

      // Act & Assert
      await expect(service.validateAccessTokenNotRevoke(accessToken)).resolves.toBeUndefined();
    });

    it('should throw INVALID_TOKEN exception when token not found', async () => {
      // Arrange
      const token = Token.create({
        accessToken: 'revoked-access-token',
        refreshToken: 'refresh-token-xyz',
        refreshTokenExpiresAt: new Date('2099-12-31'),
        userId: 'user-123',
      });
      token.revokeToken();

      const accessToken = 'revoked-access-token';
      tokenRepository.findTokenByAccessToken.mockResolvedValue(token);

      // Act & Assert
      try {
        await service.validateAccessTokenNotRevoke(accessToken);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.TOKEN_EXPIRED);
      }
    });
  });
  describe('validateRefreshTokenNotRevoke', () => {
    it('should pass validation when refresh token is valid', async () => {
      // Arrange
      const token = Token.create({
        accessToken: 'access-token-abc',
        refreshToken: 'expired-refresh-token',
        userId: 'user-123',
        refreshTokenExpiresAt: new Date('2020-01-01'),
      });

      const refreshToken = 'expired-refresh-token';
      tokenRepository.findTokenByRefreshToken.mockResolvedValue(token);

      // Act & Assert
      try {
        await service.validateRefreshTokenNotRevoke(refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.TOKEN_EXPIRED);
      }
    });

    it('should throw INVALID_TOKEN exception when token not found', async () => {
      // Arrange
      const refreshToken = 'non-existent-token';
      tokenRepository.findTokenByRefreshToken.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.validateRefreshTokenNotRevoke(refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.INVALID_TOKEN);
      }
    });

    it('should throw TOKEN_EXPIRED exception when token is expired', async () => {
      // Arrange
      const token = Token.create({
        userId: 'user-123',
        accessToken: 'access-token-abc',
        refreshToken: 'expired-refresh-token',
        refreshTokenExpiresAt: new Date('2020-01-01'), // 과거 날짜
      });

      const refreshToken = 'expired-refresh-token';
      tokenRepository.findTokenByRefreshToken.mockResolvedValue(token);

      // Act & Assert
      try {
        await service.validateRefreshTokenNotRevoke(refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.TOKEN_EXPIRED);
      }
    });
  });
});
