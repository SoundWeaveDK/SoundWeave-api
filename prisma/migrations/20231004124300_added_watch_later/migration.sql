/*
  Warnings:

  - Added the required column `watchLaterId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `watchLaterId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Watch_later` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_watchLaterId_fkey` FOREIGN KEY (`watchLaterId`) REFERENCES `Watch_later`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
