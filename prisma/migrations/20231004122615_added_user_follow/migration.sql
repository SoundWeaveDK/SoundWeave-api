/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `Comments_liked` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comments_liked` DROP COLUMN `assignedAt`;

-- CreateTable
CREATE TABLE `_Userfollows` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Userfollows_AB_unique`(`A`, `B`),
    INDEX `_Userfollows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Userfollows` ADD CONSTRAINT `_Userfollows_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Userfollows` ADD CONSTRAINT `_Userfollows_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
