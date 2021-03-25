/*
  Warnings:

  - You are about to drop the column `idSeller` on the `Auction` table. All the data in the column will be lost.
  - Added the required column `idBuyer` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Auction` DROP FOREIGN KEY `Auction_ibfk_1`;

-- AlterTable
ALTER TABLE `Auction` DROP COLUMN `idSeller`,
    ADD COLUMN     `idBuyer` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Auction` ADD FOREIGN KEY (`idBuyer`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
