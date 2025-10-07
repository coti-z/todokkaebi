import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtDecodedToken, TokenEnum, TokenPair } from '@libs/jwt';

import { CreateJwtParam } from '@auth/application/dto/params/create-jwt-token.param';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';

describe('TokenByJWTService', () => {
  let service: TokenByJWTService;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(),
      decode: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenByJWTService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TokenByJWTService>(TokenByJWTService);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generatePairToken', () => {
    it('should generate access ans refresh token pair', async () => {
      // Arrange
      const params: CreateJwtParam = {
        userId: 'user-123',
      };

      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';
      const mockAccessExpires = new Date('2025-01-01T12:00:00Z');
      const mockRefreshExpires = new Date('2025-02-01T12:00:00Z');

      const mockAccessDecoded: JwtDecodedToken = {
        userId: 'user-123',
        type: TokenEnum.ACCESS,
        exp: Math.floor(mockAccessExpires.getTime() / 1000),
        iat: Math.floor(Date.now() / 1000),
      };
      const mockRefreshDecoded: JwtDecodedToken = {
        type: TokenEnum.REFRESH,
        exp: Math.floor(mockRefreshExpires.getTime() / 1000),
        iat: Math.floor(Date.now() / 1000),
        userId: 'user-123',
      };

      configService.get.mockReturnValueOnce('15m');
      configService.get.mockReturnValueOnce('7d');

      jwtService.sign.mockReturnValueOnce(mockAccessToken).mockReturnValueOnce(mockRefreshToken);
      jwtService.decode
        .mockReturnValueOnce(mockAccessDecoded)
        .mockReturnValueOnce(mockRefreshDecoded);

      // Act
      const result = await service.generatePairToken(params);

      const expireResult: TokenPair = {
        accessToken: mockAccessToken,
        accessTokenExpires: mockAccessExpires,
        refreshToken: mockRefreshToken,
        refreshTokenExpires: mockRefreshExpires,
      };
      // Assert
      expect(result).toEqual(expireResult);
    });
  });

  describe('generateAccessToken', () => {
    it('should generate access token with correct payload and expiration', async () => {
      // Arrange
      const userId = 'user-123';
      const mockToken = 'mock-access-token';
      const mockExpires = new Date('2025-01-01T12:00:00Z');
      const mockDecoded: JwtDecodedToken = {
        type: TokenEnum.ACCESS,
        userId: userId,
        exp: Math.floor(mockExpires.getTime() / 1000),
        iat: Math.floor(Date.now() / 1000),
      };

      configService.get.mockReturnValue('15m');
      jwtService.sign.mockReturnValue(mockToken);
      jwtService.decode.mockReturnValue(mockDecoded);

      // Act
      const result = await service.generateAccessToken(userId);

      // Assert
      expect(result.token).toBe(mockToken);
      expect(result.tokenExpires).toEqual(mockExpires);
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate refresh token with correct payload and expiration', async () => {
      // Arrange
      const userId = 'user-456';
      const mockToken = 'mock-refresh-token';
      const mockExpires = new Date('2025-02-01T12:00:00Z');

      configService.get.mockReturnValue('7d');
      jwtService.sign.mockReturnValue(mockToken);
      jwtService.decode.mockReturnValue(mockToken);

      // Act
      const result = await service.generateRefreshToken(userId);

      // Assert
      expect(result.token).toBe(mockToken);
    });
  });
});
