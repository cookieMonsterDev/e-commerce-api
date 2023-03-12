/*
  Warnings:

  - You are about to drop the column `productId` on the `cards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_productId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "productId",
ALTER COLUMN "totalPrice" SET DEFAULT 0;
