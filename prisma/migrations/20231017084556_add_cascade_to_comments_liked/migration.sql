-- DropForeignKey
ALTER TABLE `Comments_liked` DROP FOREIGN KEY `Comments_liked_commentId_fkey`;

-- AddForeignKey
ALTER TABLE `Comments_liked` ADD CONSTRAINT `Comments_liked_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
