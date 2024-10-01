/*
  Warnings:

  - Added the required column `disponibilidadId` to the `Citas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Citas" ADD COLUMN     "disponibilidadId" INTEGER NOT NULL;
