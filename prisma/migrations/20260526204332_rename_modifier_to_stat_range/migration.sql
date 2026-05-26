/*
  Warnings:

  - You are about to drop the `Modifier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Modifier" DROP CONSTRAINT "Modifier_breedId_fkey";

-- DropTable
DROP TABLE "Modifier";

-- CreateTable
CREATE TABLE "StatRange" (
    "id" SERIAL NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "stat" TEXT NOT NULL,
    "breedId" INTEGER NOT NULL,

    CONSTRAINT "StatRange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatRange" ADD CONSTRAINT "StatRange_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
