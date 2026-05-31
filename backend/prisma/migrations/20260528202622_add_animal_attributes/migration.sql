/*
  Warnings:

  - Added the required column `attributes` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "attributes" JSONB NOT NULL;
