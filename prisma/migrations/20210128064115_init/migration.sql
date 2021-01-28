/*
  Warnings:

  - You are about to drop the column `bio` on the `profile` table. All the data in the column will be lost.

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
ALTER TABLE `profile` DROP COLUMN `bio`,
    ADD COLUMN     `description` VARCHAR(191),
    ADD COLUMN     `profile_image` VARCHAR(191);

-- AddForeignKey
ALTER TABLE `Auction` ADD FOREIGN KEY (`bidder_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auction` ADD FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`auction_id`) REFERENCES `Auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
