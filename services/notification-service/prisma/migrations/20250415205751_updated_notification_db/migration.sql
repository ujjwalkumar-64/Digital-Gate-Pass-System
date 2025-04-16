/*
  Warnings:

  - Added the required column `email` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "type" TEXT NOT NULL;
