/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Tokens` table. All the data in the column will be lost.
  - Added the required column `refreshTokenExpiresAt` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Tokens_isRevoked_expiresAt_idx` ON `Tokens`;

-- AlterTable
ALTER TABLE `Tokens` DROP COLUMN `expiresAt`,
    ADD COLUMN `refreshTokenExpiresAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `Tokens_refreshToken_isRevoked_idx` ON `Tokens`(`refreshToken`, `isRevoked`);
