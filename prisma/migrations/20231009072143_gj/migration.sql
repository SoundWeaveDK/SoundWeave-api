/*
  Warnings:

  - You are about to drop the column `contry_name` on the `Country` table. All the data in the column will be lost.
  - Added the required column `country_name` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Country` DROP COLUMN `contry_name`,
    ADD COLUMN `country_name` VARCHAR(191) NOT NULL;
