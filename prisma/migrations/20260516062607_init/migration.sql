-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeDefinition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "min" DOUBLE PRECISION,
    "max" DOUBLE PRECISION,
    "options" TEXT[],
    "optional" BOOLEAN NOT NULL DEFAULT false,
    "mutable" BOOLEAN NOT NULL DEFAULT false,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "AttributeDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatDefinition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "StatDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gene" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "Gene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geneId" INTEGER NOT NULL,

    CONSTRAINT "Locus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allele" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "dominance" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "locusId" INTEGER NOT NULL,

    CONSTRAINT "Allele_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpressionRule" (
    "id" SERIAL NOT NULL,
    "minDominantAlleles" INTEGER NOT NULL,
    "expression" TEXT NOT NULL,
    "geneId" INTEGER NOT NULL,

    CONSTRAINT "ExpressionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlleleOverride" (
    "id" SERIAL NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "alleleId" INTEGER NOT NULL,
    "breedId" INTEGER NOT NULL,

    CONSTRAINT "AlleleOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modifier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "breedId" INTEGER NOT NULL,

    CONSTRAINT "Modifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "breedId" INTEGER NOT NULL,
    "expressedTraits" JSONB NOT NULL,
    "stats" JSONB NOT NULL,
    "modifier" JSONB,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- AddForeignKey
ALTER TABLE "AttributeDefinition" ADD CONSTRAINT "AttributeDefinition_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatDefinition" ADD CONSTRAINT "StatDefinition_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gene" ADD CONSTRAINT "Gene_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locus" ADD CONSTRAINT "Locus_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allele" ADD CONSTRAINT "Allele_locusId_fkey" FOREIGN KEY ("locusId") REFERENCES "Locus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionRule" ADD CONSTRAINT "ExpressionRule_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlleleOverride" ADD CONSTRAINT "AlleleOverride_alleleId_fkey" FOREIGN KEY ("alleleId") REFERENCES "Allele"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlleleOverride" ADD CONSTRAINT "AlleleOverride_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modifier" ADD CONSTRAINT "Modifier_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
