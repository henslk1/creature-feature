/*
  Warnings:

  - A unique constraint covering the columns `[name,speciesId]` on the table `AttributeDefinition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,speciesId]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,speciesId]` on the table `Gene` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,speciesId]` on the table `StatDefinition` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Breed" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Gene" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "AttributeDefinition_name_speciesId_key" ON "AttributeDefinition"("name", "speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_speciesId_key" ON "Breed"("name", "speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "Gene_name_speciesId_key" ON "Gene"("name", "speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "StatDefinition_name_speciesId_key" ON "StatDefinition"("name", "speciesId");
