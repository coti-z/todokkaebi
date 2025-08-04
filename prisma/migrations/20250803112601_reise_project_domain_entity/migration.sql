/*
  Warnings:

  - You are about to drop the column `invitationStatus` on the `ProjectInvitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProjectInvitation` DROP COLUMN `invitationStatus`,
    ADD COLUMN `projectInvitationStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING';
