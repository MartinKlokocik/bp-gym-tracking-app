-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TEXT,
    "gender" TEXT,
    "profilePicture" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "fitnessLevel" "FitnessLevel",
    "yearsOfExperience" INTEGER,
    "primaryGoal" TEXT,
    "secondaryGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferredWorkoutDays" INTEGER,
    "workoutDuration" INTEGER,
    "availableEquipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "healthIssues" TEXT,
    "injuries" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
