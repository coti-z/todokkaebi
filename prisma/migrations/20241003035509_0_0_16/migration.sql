/*
  Warnings:

  - You are about to drop the column `actualEndDate` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `actualStartDate` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `actualEndDate`,
    DROP COLUMN `actualStartDate`;
