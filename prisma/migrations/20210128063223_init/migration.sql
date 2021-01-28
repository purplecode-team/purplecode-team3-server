/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[phone_num]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `bidder_id` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auction_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_num` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `battery_rating` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- AlterTable
ALTER TABLE `auction` ADD COLUMN     `bidder_id` INT NOT NULL,
    ADD COLUMN     `seller_id` INT NOT NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN     `productId` INT;

-- AlterTable
ALTER TABLE `product` ADD COLUMN     `seller_id` INT NOT NULL,
    ADD COLUMN     `auction_id` INT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN     `phone_num` VARCHAR(191) NOT NULL,
    ADD COLUMN     `battery_rating` INT NOT NULL,
    ADD COLUMN     `admin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN     `cash` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updated_date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User.phone_num_unique` ON `User`(`phone_num`);

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
