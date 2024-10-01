/*
  Warnings:

  - You are about to drop the column `actualEndDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `Check` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `actualEndDate`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `Check` BOOLEAN NOT NULL;
