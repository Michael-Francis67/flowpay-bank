/*
  Warnings:

  - Added the required column `accountReference` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "accountReference" TEXT NOT NULL,
ADD COLUMN     "bankCode" TEXT NOT NULL;
