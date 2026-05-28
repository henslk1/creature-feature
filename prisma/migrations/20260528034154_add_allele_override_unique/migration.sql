/*
  Warnings:

  - A unique constraint covering the columns `[alleleId,breedId]` on the table `AlleleOverride` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AlleleOverride_alleleId_breedId_key" ON "AlleleOverride"("alleleId", "breedId");
