-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image" TEXT DEFAULT '',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedExercise" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "exerciseNumber" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "plannedWorkoutDayId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PlannedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedSet" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "restTime" INTEGER,
    "setNumber" INTEGER NOT NULL,
    "plannedExerciseId" TEXT NOT NULL,

    CONSTRAINT "PlannedSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedWorkoutDay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plannedWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PlannedWorkoutDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedWorkout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schema" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PlannedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarDay" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "plannedWorkoutDayId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CalendarDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseRecord" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "calendarDayId" TEXT NOT NULL,

    CONSTRAINT "ExerciseRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordSet" (
    "id" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "restTime" INTEGER,
    "weight" DOUBLE PRECISION NOT NULL,
    "exerciseRecordId" TEXT NOT NULL,

    CONSTRAINT "RecordSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedExercise" ADD CONSTRAINT "PlannedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedExercise" ADD CONSTRAINT "PlannedExercise_plannedWorkoutDayId_fkey" FOREIGN KEY ("plannedWorkoutDayId") REFERENCES "PlannedWorkoutDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedExercise" ADD CONSTRAINT "PlannedExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedSet" ADD CONSTRAINT "PlannedSet_plannedExerciseId_fkey" FOREIGN KEY ("plannedExerciseId") REFERENCES "PlannedExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedWorkoutDay" ADD CONSTRAINT "PlannedWorkoutDay_plannedWorkoutId_fkey" FOREIGN KEY ("plannedWorkoutId") REFERENCES "PlannedWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedWorkoutDay" ADD CONSTRAINT "PlannedWorkoutDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedWorkout" ADD CONSTRAINT "PlannedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarDay" ADD CONSTRAINT "CalendarDay_plannedWorkoutDayId_fkey" FOREIGN KEY ("plannedWorkoutDayId") REFERENCES "PlannedWorkoutDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarDay" ADD CONSTRAINT "CalendarDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_calendarDayId_fkey" FOREIGN KEY ("calendarDayId") REFERENCES "CalendarDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordSet" ADD CONSTRAINT "RecordSet_exerciseRecordId_fkey" FOREIGN KEY ("exerciseRecordId") REFERENCES "ExerciseRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
