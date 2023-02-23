/*
  Warnings:

  - The primary key for the `Story` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorID` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Story` table. All the data in the column will be lost.
  - The `id` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Story" DROP CONSTRAINT "Story_pkey",
DROP COLUMN "authorID",
DROP COLUMN "createdAt",
DROP COLUMN "link",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Story_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
