/*
  Warnings:

  - Made the column `actualEndDate` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Category_id_projectId_name_idx` ON `Category`;

-- DropIndex
DROP INDEX `Task_id_categoryId_status_startDate_endDate_idx` ON `Task`;

-- AlterTable
ALTER TABLE `Project` MODIFY `actualEndDate` DATETIME(3) NOT NULL;
