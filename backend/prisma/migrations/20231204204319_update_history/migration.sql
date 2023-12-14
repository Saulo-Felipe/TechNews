/*
  Warnings:

  - You are about to drop the `NewsHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NewsHistory";

-- CreateTable
CREATE TABLE "updateHistory" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "updated_amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updateHistory_pkey" PRIMARY KEY ("id")
);
