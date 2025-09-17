/*
  Warnings:

  - You are about to drop the column `status` on the `ProjectInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProjectInvitation` DROP COLUMN `status`,
    ADD COLUMN `invitationStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `status`,
    ADD COLUMN `taskStatus` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETE') NOT NULL DEFAULT 'PENDING';
