/*
  Warnings:

  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETE') NOT NULL DEFAULT 'PENDING';
