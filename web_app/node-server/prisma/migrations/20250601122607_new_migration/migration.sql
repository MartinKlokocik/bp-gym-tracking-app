-- CreateTable
CREATE TABLE "DevicePairing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceUUID" TEXT NOT NULL,
    "isPaired" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DevicePairing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DevicePairing" ADD CONSTRAINT "DevicePairing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
