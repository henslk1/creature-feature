import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { rollAttributes } from "./rollAttributes";
import { rollGenes } from "./rollGenes";
import { rollStats } from "./rollStats";

export async function generateAnimal(breedId: number) {

  try {
    const breedData = await prisma.breed.findUnique({
      where: { id: breedId}
    })

    if (!breedData) {
      logger.warn({ breedId }, `Breed [${breedId}] not found`);
      throw new Error(`Breed [${breedId}] not found`);
    }
    
  }
}