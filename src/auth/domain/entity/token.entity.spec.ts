import { Token, TokenProps } from '@auth/domain/entity/token.entity';

describe('Token Entity', () => {
  describe('constructor', () => {
    it('should create token with valid parameters', () => {
      const tokenData: TokenProps = {
        userId: 'test-user',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        refreshTokenExpiresAt: new Date(),
      };

      const token = Token.create(tokenData);

      expect(token.userId).toBe(tokenData.userId);
      expect(token.accessToken).toBe(tokenData.accessToken);
      expect(token.refreshToken).toBe(tokenData.refreshToken);
      expect(token.userId).toBe(tokenData.userId);
    });

    it('should throw error with invalid parameters', () => {
      expect(() => Token.create(null as any)).toThrow();
    });
  });

  describe('token method', () => {
    it('should revoke token successfully', () => {
      const tokenData: TokenProps = {
        userId: 'test-user',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        refreshTokenExpiresAt: new Date(),
      };

      const token = Token.create(tokenData);
      token.revokeToken();

      expect(token.isExpired()).toBeTruthy();
    });
  });
});
