import { fetchBreedProfile } from "./queries";
import { rollAttributes } from "./rollAttributes";
import { rollGenes } from "./rollGenes";
import { rollStats } from "./rollStats";

export async function generateAnimal(breedId: number) {
  const breedData = await fetchBreedProfile(breedId);

  if (!breedData) {
    throw new Error(`Breed [${breedId}] not found`);
  }

  const stats = rollStats(breedData.species.stats, breedData.statRanges);
  const attributes = rollAttributes(breedData.species.attributes);
  const expressedTraits = rollGenes(breedData.species.genes, breedData.overrides);

  return { stats, attributes, expressedTraits };
}
