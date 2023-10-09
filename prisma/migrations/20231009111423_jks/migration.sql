/*
  Warnings:

  - Added the required column `thumbnail` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Podcast` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;
