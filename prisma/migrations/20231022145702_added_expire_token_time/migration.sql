/*
  Warnings:

  - You are about to drop the column `resetPasswordTokenToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordTokenToken",
ADD COLUMN     "resetPasswordTokenExpire" TIMESTAMP(3);
