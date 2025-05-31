/*
  Warnings:

  - You are about to drop the column `attachedWorkoutPLan` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "attachedWorkoutPLan",
ADD COLUMN     "attachedWorkoutPlan" TEXT;
