/*
  Warnings:

  - You are about to alter the column `views` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `likes` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Podcast` MODIFY `views` INTEGER NOT NULL DEFAULT 0,
    MODIFY `likes` INTEGER NOT NULL DEFAULT 0;
