/*
  Warnings:

  - Added the required column `content_type` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "content_type" VARCHAR(5) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR;
