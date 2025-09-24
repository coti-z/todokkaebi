-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    INDEX `Users_nickname_idx`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Project_adminId_idx`(`adminId`),
    INDEX `Project_adminId_createdAt_idx`(`adminId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectMembership` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProjectMembership_projectId_userId_idx`(`projectId`, `userId`),
    UNIQUE INDEX `ProjectMembership_userId_projectId_key`(`userId`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectInvitation` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `inviterUserId` VARCHAR(191) NOT NULL,
    `inviteeUserId` VARCHAR(191) NOT NULL,
    `projectInvitationStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProjectInvitation_projectId_inviteeUserId_idx`(`projectId`, `inviteeUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tokens` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(512) NOT NULL,
    `refreshToken` VARCHAR(512) NOT NULL,
    `isRevoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `refreshTokenExpiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tokens_accessToken_key`(`accessToken`),
    INDEX `Tokens_isRevoked_refreshTokenExpiresAt_idx`(`isRevoked`, `refreshTokenExpiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OAuthProvider` (
    `id` VARCHAR(191) NOT NULL,
    `provider` ENUM('KAKAO', 'GOOGLE', 'APPLE') NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `OAuthProvider_userId_provider_idx`(`userId`, `provider`),
    UNIQUE INDEX `OAuthProvider_provider_providerId_key`(`provider`, `providerId`),
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

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `taskStatus` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETE') NOT NULL DEFAULT 'PENDING',
    `check` BOOLEAN NOT NULL DEFAULT false,
    `categoryId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `actualStartDate` DATETIME(3) NOT NULL,
    `actualEndDate` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL,

    INDEX `Task_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_inviterUserId_fkey` FOREIGN KEY (`inviterUserId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvitation` ADD CONSTRAINT `ProjectInvitation_inviteeUserId_fkey` FOREIGN KEY (`inviteeUserId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OAuthProvider` ADD CONSTRAINT `OAuthProvider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCredentials` ADD CONSTRAINT `UserCredentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
