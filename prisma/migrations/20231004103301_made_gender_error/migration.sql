/*
  Warnings:

  - You are about to drop the column `userId` on the `Gender` table. All the data in the column will be lost.
  - Added the required column `genderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Gender` DROP FOREIGN KEY `Gender_userId_fkey`;

-- AlterTable
ALTER TABLE `Gender` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `genderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
