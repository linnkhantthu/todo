/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");
