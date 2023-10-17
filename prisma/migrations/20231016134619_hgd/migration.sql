/*
  Warnings:

  - You are about to drop the column `sub_comment_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Comments_liked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_sub_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comments_liked` DROP FOREIGN KEY `Comments_liked_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments_liked` DROP FOREIGN KEY `Comments_liked_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `sub_comment_id`;

-- DropTable
DROP TABLE `Comments_liked`;
