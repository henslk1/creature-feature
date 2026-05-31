import { applyStatRanges, mapLoci } from "../lib/serviceUtils";

export function buildProfile(breedData: any) {
  const genes = breedData.species.genes.map((gene: any) => mapLoci(gene, breedData.overrides));
  const stats = applyStatRanges(breedData.species.stats, breedData.statRanges);

  return {
    id: breedData.id,
    createdAt: breedData.createdAt,
    name: breedData.name,
    active: breedData.active,
    genes,
    stats,
    attributes: breedData.species.attributes,
    speciesId: breedData.speciesId
  };
};
