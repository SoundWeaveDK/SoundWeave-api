/*
  Warnings:

  - You are about to alter the column `money` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Podcast` MODIFY `views` BIGINT NOT NULL,
    MODIFY `likes` BIGINT NOT NULL,
    MODIFY `money` DOUBLE NOT NULL;
