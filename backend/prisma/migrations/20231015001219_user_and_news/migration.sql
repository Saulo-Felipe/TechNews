/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
