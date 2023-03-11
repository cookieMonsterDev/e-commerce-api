/*
  Warnings:

  - You are about to drop the column `orderId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderId",
ADD COLUMN     "cartId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
