/*
  Warnings:

  - A unique constraint covering the columns `[stat,breedId]` on the table `StatRange` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StatRange_stat_breedId_key" ON "StatRange"("stat", "breedId");
