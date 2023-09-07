/*
  Warnings:

  - You are about to drop the column `booking_id` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_booking_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "booking_id";
