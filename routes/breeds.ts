import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";

const router = Router();

// GET all breeds
router.get("/", async (req, res) => {
  
  try {
    const getBreeds = await prisma.breed.findMany({
      orderBy: { id: "asc" }
    });

    logger.info({ breeds: getBreeds }, "Breeds found");
    res.json(getBreeds);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// GET individual breeds
router.get("/:breedId", async (req, res) => {

  try {
    const found = await prisma.breed.findUnique({
      where: { id: Number(req.params.breedId) }
    });

    if (!found) {
      logger.warn({ breedId: req.params.breedId },
        `Breed [${req.params.breedId}] not found`);
      res.status(404).json({ message: "Breed not found" });
      return;
    }
    
    logger.info({ breed: found }, "Breed found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})


export default router;
