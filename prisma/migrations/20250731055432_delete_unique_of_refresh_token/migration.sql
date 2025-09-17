-- DropIndex
DROP INDEX `Tokens_refreshToken_isRevoked_idx` ON `Tokens`;

-- CreateIndex
CREATE INDEX `Tokens_isRevoked_refreshTokenExpiresAt_idx` ON `Tokens`(`isRevoked`, `refreshTokenExpiresAt`);
