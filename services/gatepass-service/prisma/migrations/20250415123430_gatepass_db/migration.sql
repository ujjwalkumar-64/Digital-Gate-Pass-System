/*
  Warnings:

  - The values [rejected] on the enum `GatePassStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GatePassStatus_new" AS ENUM ('pending', 'issued', 'used', 'expired');
ALTER TABLE "GatePass" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GatePass" ALTER COLUMN "status" TYPE "GatePassStatus_new" USING ("status"::text::"GatePassStatus_new");
ALTER TYPE "GatePassStatus" RENAME TO "GatePassStatus_old";
ALTER TYPE "GatePassStatus_new" RENAME TO "GatePassStatus";
DROP TYPE "GatePassStatus_old";
ALTER TABLE "GatePass" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
