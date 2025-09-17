-- DropIndex
DROP INDEX `Tokens_accessToken_key` ON `Tokens`;

-- DropIndex
DROP INDEX `Tokens_refreshToken_key` ON `Tokens`;

-- AlterTable
ALTER TABLE `Tokens` MODIFY `accessToken` TEXT NOT NULL,
    MODIFY `refreshToken` TEXT NOT NULL;
