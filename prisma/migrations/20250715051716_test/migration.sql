/*
  Warnings:

  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `actualStartDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `OAuthProvider` DROP FOREIGN KEY `OAuthProvider_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tokens` DROP FOREIGN KEY `Tokens_userId_fkey`;

-- DropIndex
DROP INDEX `Category_projectId_fkey` ON `Category`;

-- DropIndex
DROP INDEX `Project_userId_idx` ON `Project`;

-- DropIndex
DROP INDEX `Task_endDate_idx` ON `Task`;

-- DropIndex
DROP INDEX `Task_startDate_idx` ON `Task`;

-- DropIndex
DROP INDEX `Tokens_userId_fkey` ON `Tokens`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `userId`,
    ADD COLUMN `adminId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `actualStartDate` DATETIME(3) NOT NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Tokens` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ProjectMembership` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectInvitation` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `inviterUserId` VARCHAR(191) NOT NULL,
    `inviteeUserId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProjectInvitation_projectId_inviteeUserId_idx`(`projectId`, `inviteeUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCredentials` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserCredentials_userId_key`(`userId`),
    UNIQUE INDEX `UserCredentials_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Users_nickname_idx` ON `Users`(`nickname`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_inviterUserId_fkey` FOREIGN KEY (`inviterUserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_inviteeUserId_fkey` FOREIGN KEY (`inviteeUserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OAuthProvider` ADD CONSTRAINT `OAuthProvider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCredentials` ADD CONSTRAINT `UserCredentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
