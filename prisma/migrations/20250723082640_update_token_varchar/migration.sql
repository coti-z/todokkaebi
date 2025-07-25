/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Tokens` MODIFY `accessToken` VARCHAR(512) NOT NULL,
    MODIFY `refreshToken` VARCHAR(512) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tokens_accessToken_key` ON `Tokens`(`accessToken`);

-- CreateIndex
CREATE UNIQUE INDEX `Tokens_refreshToken_key` ON `Tokens`(`refreshToken`);
