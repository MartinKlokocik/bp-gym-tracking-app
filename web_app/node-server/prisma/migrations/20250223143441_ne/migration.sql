/*
  Warnings:

  - You are about to drop the column `timestamp` on the `ExerciseRecord` table. All the data in the column will be lost.
  - Added the required column `calendarDayId` to the `ExerciseRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `ExerciseRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED');

-- AlterTable
ALTER TABLE "ExerciseRecord" DROP COLUMN "timestamp",
ADD COLUMN     "calendarDayId" TEXT NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_calendarDayId_fkey" FOREIGN KEY ("calendarDayId") REFERENCES "CalendarDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
