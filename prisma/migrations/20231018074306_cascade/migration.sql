-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments_liked` DROP FOREIGN KEY `Comments_liked_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_liked_by_user` DROP FOREIGN KEY `Podcast_liked_by_user_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_liked_by_user` DROP FOREIGN KEY `Podcast_liked_by_user_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_viewed_by_user` DROP FOREIGN KEY `Podcast_viewed_by_user_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_viewed_by_user` DROP FOREIGN KEY `Podcast_viewed_by_user_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Watch_later` DROP FOREIGN KEY `Watch_later_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Watch_later` DROP FOREIGN KEY `Watch_later_userId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `birthday` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Podcast_viewed_by_user` ADD CONSTRAINT `Podcast_viewed_by_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Podcast_viewed_by_user` ADD CONSTRAINT `Podcast_viewed_by_user_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Podcast_liked_by_user` ADD CONSTRAINT `Podcast_liked_by_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Podcast_liked_by_user` ADD CONSTRAINT `Podcast_liked_by_user_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments_liked` ADD CONSTRAINT `Comments_liked_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch_later` ADD CONSTRAINT `Watch_later_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch_later` ADD CONSTRAINT `Watch_later_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
