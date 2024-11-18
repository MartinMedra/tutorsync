/*
  Warnings:

  - You are about to drop the column `subjet` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subjet",
ADD COLUMN     "subject" TEXT NOT NULL DEFAULT ' ';
