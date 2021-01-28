/*
  Warnings:

  - You are about to drop the column `bidder_id` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `auction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `auction_ibfk_1`;

-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `auction_ibfk_2`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_ibfk_1`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_2`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_1`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- AlterTable
ALTER TABLE `auction` DROP COLUMN `bidder_id`,
    DROP COLUMN `seller_id`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN     `userId` INT;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`auction_id`) REFERENCES `Auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
