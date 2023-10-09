/*
  Warnings:

  - Added the required column `watchLaterId` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Podcast` ADD COLUMN `watchLaterId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_watchLaterId_fkey` FOREIGN KEY (`watchLaterId`) REFERENCES `Watch_later`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
