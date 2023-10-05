/*
  Warnings:

  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_commentId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `country`,
    DROP COLUMN `gender`,
    MODIFY `commentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
