-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `OAuthProvider` DROP FOREIGN KEY `OAuthProvider_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectInvitation` DROP FOREIGN KEY `ProjectInvitation_inviteeUserId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectInvitation` DROP FOREIGN KEY `ProjectInvitation_inviterUserId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectMembership` DROP FOREIGN KEY `ProjectMembership_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tokens` DROP FOREIGN KEY `Tokens_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCredentials` DROP FOREIGN KEY `UserCredentials_userId_fkey`;

-- DropIndex
DROP INDEX `Category_projectId_fkey` ON `Category`;

-- DropIndex
DROP INDEX `ProjectInvitation_inviteeUserId_fkey` ON `ProjectInvitation`;

-- DropIndex
DROP INDEX `ProjectInvitation_inviterUserId_fkey` ON `ProjectInvitation`;

-- DropIndex
DROP INDEX `ProjectMembership_userId_fkey` ON `ProjectMembership`;

-- DropIndex
DROP INDEX `Tokens_userId_fkey` ON `Tokens`;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
