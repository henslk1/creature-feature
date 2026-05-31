import prisma from "../lib/prisma";

export async function fetchBreedProfile(breedId: number) {
  return await prisma.breed.findUnique({
    where: { id: breedId },
    include: {
      statRanges: true,
      overrides: true,
      species: {
        include: {
          stats: true,
          attributes: true,
          genes: {
            include: {
              loci: { include: { alleles: true } },
              expressionRules: true
            }
          }
        }
      }
    }
  });
}
