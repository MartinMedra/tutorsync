/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Citas" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT ' ';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";
