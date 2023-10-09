/*
  Warnings:

  - Made the column `views` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likes` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `money` on table `Podcast` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Podcast` MODIFY `views` BIGINT NOT NULL DEFAULT 0,
    MODIFY `likes` BIGINT NOT NULL DEFAULT 0,
    MODIFY `money` DOUBLE NOT NULL DEFAULT 0;
