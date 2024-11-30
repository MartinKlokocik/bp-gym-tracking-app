-- CreateTable
CREATE TABLE "Calendars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "planId" INTEGER,
    "notes" TEXT,
    "dayLogId" INTEGER,

    CONSTRAINT "Calendars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayLogs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "steps" INTEGER,
    "caloriesIntake" INTEGER,

    CONSTRAINT "DayLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseFiles" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "ExerciseFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "musclesTargeted" TEXT,
    "equipmentRequired" TEXT,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanExercises" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER,
    "exerciseId" INTEGER,
    "sets" INTEGER,
    "reps" INTEGER,
    "weight" DOUBLE PRECISION,
    "restTimeSeconds" INTEGER,

    CONSTRAINT "PlanExercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlans" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "heightCm" INTEGER,
    "weightKg" DOUBLE PRECISION,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLogs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "exerciseId" INTEGER,
    "dayLogId" INTEGER NOT NULL,
    "performedSets" INTEGER,
    "performedReps" INTEGER,
    "weight" DOUBLE PRECISION,
    "durationSeconds" INTEGER,
    "performedAt" TIMESTAMP(3) NOT NULL,
    "heartRate" INTEGER,

    CONSTRAINT "WorkoutLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_DayLogId_Unique" ON "Calendars"("dayLogId");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_DayLogId_Unique_Index" ON "Calendars"("dayLogId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseFile_ExerciseId_Unique" ON "ExerciseFiles"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_name_key" ON "Exercises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_userId_key" ON "UserProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutLog_DayLogId_Unique" ON "WorkoutLogs"("dayLogId");

-- AddForeignKey
ALTER TABLE "Calendars" ADD CONSTRAINT "Calendars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendars" ADD CONSTRAINT "Calendars_planId_fkey" FOREIGN KEY ("planId") REFERENCES "TrainingPlans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendars" ADD CONSTRAINT "Calendars_dayLogId_fkey" FOREIGN KEY ("dayLogId") REFERENCES "DayLogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayLogs" ADD CONSTRAINT "DayLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseFiles" ADD CONSTRAINT "ExerciseFiles_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercises" ADD CONSTRAINT "PlanExercises_planId_fkey" FOREIGN KEY ("planId") REFERENCES "TrainingPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercises" ADD CONSTRAINT "PlanExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlans" ADD CONSTRAINT "TrainingPlans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLogs" ADD CONSTRAINT "WorkoutLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLogs" ADD CONSTRAINT "WorkoutLogs_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLogs" ADD CONSTRAINT "WorkoutLogs_dayLogId_fkey" FOREIGN KEY ("dayLogId") REFERENCES "DayLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
