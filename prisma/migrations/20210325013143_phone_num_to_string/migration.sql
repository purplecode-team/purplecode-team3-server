/*
  Warnings:

  - You are about to alter the column `phoneNum` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `phoneNum` INTEGER NOT NULL;
