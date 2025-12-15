/*
  Warnings:

  - Added the required column `destination` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "emergencyContact" TEXT NOT NULL;
