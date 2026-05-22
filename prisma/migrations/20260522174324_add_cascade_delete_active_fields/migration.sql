-- DropForeignKey
ALTER TABLE "Allele" DROP CONSTRAINT "Allele_locusId_fkey";

-- DropForeignKey
ALTER TABLE "AlleleOverride" DROP CONSTRAINT "AlleleOverride_alleleId_fkey";

-- DropForeignKey
ALTER TABLE "AlleleOverride" DROP CONSTRAINT "AlleleOverride_breedId_fkey";

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_breedId_fkey";

-- DropForeignKey
ALTER TABLE "AttributeDefinition" DROP CONSTRAINT "AttributeDefinition_speciesId_fkey";

-- DropForeignKey
ALTER TABLE "Breed" DROP CONSTRAINT "Breed_speciesId_fkey";

-- DropForeignKey
ALTER TABLE "ExpressionRule" DROP CONSTRAINT "ExpressionRule_geneId_fkey";

-- DropForeignKey
ALTER TABLE "Gene" DROP CONSTRAINT "Gene_speciesId_fkey";

-- DropForeignKey
ALTER TABLE "Locus" DROP CONSTRAINT "Locus_geneId_fkey";

-- DropForeignKey
ALTER TABLE "Modifier" DROP CONSTRAINT "Modifier_breedId_fkey";

-- DropForeignKey
ALTER TABLE "StatDefinition" DROP CONSTRAINT "StatDefinition_speciesId_fkey";

-- AlterTable
ALTER TABLE "Breed" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Gene" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "AttributeDefinition" ADD CONSTRAINT "AttributeDefinition_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatDefinition" ADD CONSTRAINT "StatDefinition_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gene" ADD CONSTRAINT "Gene_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locus" ADD CONSTRAINT "Locus_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allele" ADD CONSTRAINT "Allele_locusId_fkey" FOREIGN KEY ("locusId") REFERENCES "Locus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionRule" ADD CONSTRAINT "ExpressionRule_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlleleOverride" ADD CONSTRAINT "AlleleOverride_alleleId_fkey" FOREIGN KEY ("alleleId") REFERENCES "Allele"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlleleOverride" ADD CONSTRAINT "AlleleOverride_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modifier" ADD CONSTRAINT "Modifier_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
