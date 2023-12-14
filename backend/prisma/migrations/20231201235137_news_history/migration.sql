/*
  Warnings:

  - You are about to drop the column `newsId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `newsId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_image_url` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalContent` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_newsId_fkey";

-- DropIndex
DROP INDEX "Category_newsId_key";

-- DropIndex
DROP INDEX "News_userId_key";

-- DropIndex
DROP INDEX "Tag_newsId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "newsId";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "cover_image_url" VARCHAR(600) NOT NULL,
ADD COLUMN     "excerpt" VARCHAR(600) NOT NULL,
ADD COLUMN     "originalContent" VARCHAR(10) NOT NULL,
ADD COLUMN     "publicationDate" VARCHAR(100),
ADD COLUMN     "url" VARCHAR(600) NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "newsId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "password" VARCHAR(255),
ADD COLUMN     "username" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "NewsHistory" (
    "id" SERIAL NOT NULL,
    "newsQtd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToTag_AB_unique" ON "_NewsToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToTag_B_index" ON "_NewsToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
