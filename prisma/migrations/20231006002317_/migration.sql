/*
  Warnings:

  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub_comment_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_commentId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `commentId`,
    ADD COLUMN `sub_comment_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_sub_comment_id_key` ON `Comment`(`sub_comment_id`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_sub_comment_id_fkey` FOREIGN KEY (`sub_comment_id`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
