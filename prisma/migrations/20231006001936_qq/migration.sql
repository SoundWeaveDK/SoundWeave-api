/*
  Warnings:

  - You are about to drop the column `commentId` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `User` table. All the data in the column will be lost.
  - Added the required column `podcastId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Podcast` DROP FOREIGN KEY `Podcast_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_commentId_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `podcastId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Podcast` DROP COLUMN `commentId`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `commentId`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
