-- DropForeignKey
ALTER TABLE `Podcast` DROP FOREIGN KEY `Podcast_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
