/*
  Warnings:

  - You are about to drop the column `filename` on the `Podcast` table. All the data in the column will be lost.
  - Added the required column `podcast_file` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Podcast` DROP COLUMN `filename`,
    ADD COLUMN `podcast_file` VARCHAR(191) NOT NULL;
