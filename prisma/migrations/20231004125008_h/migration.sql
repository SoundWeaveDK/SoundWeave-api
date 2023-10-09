/*
  Warnings:

  - You are about to drop the column `watchLaterId` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `watchLaterId` on the `User` table. All the data in the column will be lost.
  - Added the required column `podcastId` to the `Watch_later` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Watch_later` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Podcast` DROP FOREIGN KEY `Podcast_watchLaterId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_watchLaterId_fkey`;

-- AlterTable
ALTER TABLE `Podcast` DROP COLUMN `watchLaterId`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `watchLaterId`;

-- AlterTable
ALTER TABLE `Watch_later` ADD COLUMN `podcastId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Watch_later` ADD CONSTRAINT `Watch_later_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch_later` ADD CONSTRAINT `Watch_later_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
