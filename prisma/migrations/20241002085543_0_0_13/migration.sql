-- CreateIndex
CREATE INDEX `Task_startDate_idx` ON `Task`(`startDate`);

-- CreateIndex
CREATE INDEX `Task_endDate_idx` ON `Task`(`endDate`);

-- RenameIndex
ALTER TABLE `Task` RENAME INDEX `Task_categoryId_fkey` TO `Task_categoryId_idx`;
