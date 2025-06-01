-- DropForeignKey
ALTER TABLE "DevicePairing" DROP CONSTRAINT "DevicePairing_userId_fkey";

-- AlterTable
ALTER TABLE "DevicePairing" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DevicePairing" ADD CONSTRAINT "DevicePairing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
