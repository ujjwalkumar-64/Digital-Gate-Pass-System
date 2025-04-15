-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('pending', 'forwarded', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "FlowType" AS ENUM ('standard', 'hostel_direct');

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "currentStage" TEXT NOT NULL,
    "flowType" "FlowType" NOT NULL DEFAULT 'standard',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);
