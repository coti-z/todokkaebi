-- CreateIndex
CREATE INDEX `ProjectInvitation_id_idx` ON `ProjectInvitation`(`id`);

-- CreateIndex
CREATE INDEX `ProjectInvitation_projectId_idx` ON `ProjectInvitation`(`projectId`);

-- CreateIndex
CREATE INDEX `Tokens_id_idx` ON `Tokens`(`id`);

-- CreateIndex
CREATE INDEX `Users_id_idx` ON `Users`(`id`);

-- CreateIndex
CREATE INDEX `Users_email_idx` ON `Users`(`email`);

-- RenameIndex
ALTER TABLE `Category` RENAME INDEX `Category_projectId_fkey` TO `Category_projectId_idx`;
