/*
  Warnings:

  - Added the required column `link` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "link" TEXT NOT NULL;
