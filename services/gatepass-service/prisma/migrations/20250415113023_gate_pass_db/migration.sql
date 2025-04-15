-- CreateEnum
CREATE TYPE "GatePassStatus" AS ENUM ('pending', 'issued', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "FlowType" AS ENUM ('standard', 'hostel_direct');

-- CreateTable
CREATE TABLE "GatePass" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "leaveId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "status" "GatePassStatus" NOT NULL DEFAULT 'pending',
    "department" TEXT NOT NULL,
    "flowType" "FlowType" NOT NULL DEFAULT 'standard',
    "gateOutAt" TIMESTAMP(3),
    "gateInAt" TIMESTAMP(3),
    "issuedById" TEXT,
    "verifiedOutById" TEXT,
    "verifiedInById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GatePass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GatePass_leaveId_key" ON "GatePass"("leaveId");
