/*
  Warnings:

  - You are about to drop the column `Check` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `Check`,
    ADD COLUMN `check` BOOLEAN NOT NULL DEFAULT false;
