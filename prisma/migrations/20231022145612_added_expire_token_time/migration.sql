-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordTokenToken" TIMESTAMP(3),
ADD COLUMN     "verifyTokenExpire" TIMESTAMP(3);
