/*
  Warnings:

  - You are about to drop the `Podcast_liked_by_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Podcast_viewed_by_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Podcast_liked_by_user` DROP FOREIGN KEY `Podcast_liked_by_user_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_liked_by_user` DROP FOREIGN KEY `Podcast_liked_by_user_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_viewed_by_user` DROP FOREIGN KEY `Podcast_viewed_by_user_podcastId_fkey`;

-- DropForeignKey
ALTER TABLE `Podcast_viewed_by_user` DROP FOREIGN KEY `Podcast_viewed_by_user_userId_fkey`;

-- DropTable
DROP TABLE `Podcast_liked_by_user`;

-- DropTable
DROP TABLE `Podcast_viewed_by_user`;
