-- DropForeignKey
ALTER TABLE `Podcast` DROP FOREIGN KEY `Podcast_commentId_fkey`;

-- AlterTable
ALTER TABLE `Podcast` MODIFY `commentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
