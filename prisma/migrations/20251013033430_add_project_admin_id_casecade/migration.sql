-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_adminId_fkey`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
